"""Generate a 3-tier appetizer tray as GLB using bpy (Blender as a module).

Mirrors the reference photograph: three stacked round plates joined by a black
central post that ends in a stylized diamond finial. Each tier is dressed with
small bowls / glasses representing a few of the dishes in the picture.
"""

import math
import os
import sys

import bpy

OUT_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "tiered-tray.glb")
OUT_PATH = os.path.abspath(OUT_PATH)


# ---------- scene reset ----------
def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items] else "CYCLES"


# ---------- material helpers ----------
_materials = {}


def mat(name, base_color, roughness=0.55, metallic=0.0, emission=None, transmission=0.0, ior=1.45):
    if name in _materials:
        return _materials[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*base_color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if "Transmission Weight" in bsdf.inputs:
        bsdf.inputs["Transmission Weight"].default_value = transmission
    elif "Transmission" in bsdf.inputs:
        bsdf.inputs["Transmission"].default_value = transmission
    if "IOR" in bsdf.inputs:
        bsdf.inputs["IOR"].default_value = ior
    if emission is not None:
        if "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
            bsdf.inputs["Emission Strength"].default_value = 1.0
        elif "Emission" in bsdf.inputs:
            bsdf.inputs["Emission"].default_value = (*emission, 1.0)
    _materials[name] = m
    return m


def assign(obj, m):
    if obj.data.materials:
        obj.data.materials[0] = m
    else:
        obj.data.materials.append(m)


# ---------- geometry helpers ----------
def add_plate(radius, thickness, z, name, material):
    """A round plate with a slightly raised edge."""
    bpy.ops.mesh.primitive_cylinder_add(
        radius=radius, depth=thickness, vertices=96, location=(0, 0, z)
    )
    plate = bpy.context.active_object
    plate.name = name
    # bevel the edges
    bpy.ops.object.modifier_add(type="BEVEL")
    bm = plate.modifiers["Bevel"]
    bm.width = thickness * 0.4
    bm.segments = 3
    bpy.ops.object.shade_smooth()
    assign(plate, material)
    return plate


def add_post_segment(radius, height, z, material, name="Post"):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=height, vertices=32, location=(0, 0, z))
    obj = bpy.context.active_object
    obj.name = name
    bpy.ops.object.shade_smooth()
    assign(obj, material)
    return obj


def add_diamond_finial(z, material):
    """Two flat diamond shapes mounted on a small stem — the black ornament on top."""
    parts = []
    stem = add_post_segment(0.012, 0.18, z + 0.09, material, "FinialStem")
    parts.append(stem)

    for i, (rot_z, offset_x, scale_xy) in enumerate(
        [(0.0, 0.06, (0.07, 0.05)), (math.radians(70), -0.05, (0.06, 0.045))]
    ):
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(offset_x, 0, z + 0.20))
        d = bpy.context.active_object
        d.name = f"Diamond_{i}"
        d.scale = (scale_xy[0], 0.015, scale_xy[1])
        # rotate cube 45deg around Y to get a diamond cross-section, then yaw
        d.rotation_euler = (0, math.radians(45), rot_z)
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        assign(d, material)
        parts.append(d)
    return parts


def add_bowl(x, y, z, radius=0.075, height=0.045, material=None, name="Bowl"):
    """A shallow round bowl made by scaling a sphere and slicing the top."""
    bpy.ops.mesh.primitive_uv_sphere_add(radius=radius, segments=32, ring_count=16, location=(x, y, z))
    b = bpy.context.active_object
    b.name = name
    b.scale = (1.0, 1.0, height / radius)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bpy.ops.object.shade_smooth()
    if material:
        assign(b, material)
    return b


def add_glass(x, y, z, radius=0.055, height=0.09, material=None, name="Glass"):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=height, vertices=40, location=(x, y, z + height / 2))
    g = bpy.context.active_object
    g.name = name
    bpy.ops.object.modifier_add(type="BEVEL")
    g.modifiers["Bevel"].width = 0.005
    g.modifiers["Bevel"].segments = 2
    bpy.ops.object.shade_smooth()
    if material:
        assign(g, material)
    return g


def add_food_blob(x, y, z, radius, material, name="Food", squash=0.55):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=radius, segments=24, ring_count=12, location=(x, y, z))
    f = bpy.context.active_object
    f.name = name
    f.scale = (1.0, 1.0, squash)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bpy.ops.object.shade_smooth()
    assign(f, material)
    return f


# ---------- main scene ----------
def build_tray():
    reset_scene()

    plate_mat = mat("PlateGray", (0.40, 0.40, 0.42), roughness=0.6)
    post_mat = mat("PostBlack", (0.04, 0.04, 0.05), roughness=0.35, metallic=0.2)
    bowl_white = mat("BowlWhite", (0.93, 0.92, 0.89), roughness=0.55)
    glass_mat = mat("Glass", (0.95, 0.95, 0.97), roughness=0.05, transmission=0.85, ior=1.45)

    # food / drink colors
    salmon = mat("Salmon", (0.95, 0.55, 0.40))
    tuna = mat("Tuna", (0.65, 0.18, 0.18))
    edamame = mat("Edamame", (0.45, 0.60, 0.25))
    pastry = mat("Pastry", (0.85, 0.62, 0.30))
    risotto = mat("Risotto", (0.92, 0.84, 0.55))
    pasta = mat("Pasta", (0.90, 0.78, 0.45))
    hummus = mat("Hummus", (0.92, 0.80, 0.55))
    pomegranate = mat("Pomegranate", (0.55, 0.05, 0.12))
    tomato = mat("Tomato", (0.85, 0.20, 0.18))
    mozzarella = mat("Mozzarella", (0.97, 0.95, 0.88))
    chocolate = mat("Chocolate", (0.30, 0.18, 0.10))
    panna = mat("Panna", (0.97, 0.94, 0.86))
    tiramisu = mat("Tiramisu", (0.85, 0.72, 0.55))
    berries = mat("Berries", (0.55, 0.10, 0.18))
    soup = mat("Soup", (0.85, 0.30, 0.18))

    # ----- tiers -----
    # bottom: largest, middle, top
    tier_specs = [
        # (radius, thickness, z)
        (0.95, 0.04, 0.00),   # bottom
        (0.70, 0.04, 0.42),   # middle
        (0.52, 0.04, 0.84),   # top
    ]
    for i, (r, t, z) in enumerate(tier_specs):
        add_plate(r, t, z, f"Tier{i}", plate_mat)

    # central post — runs from base to just under top tier
    add_post_segment(0.025, 0.86, 0.43, post_mat, "Post")

    # diamond finial on top
    add_diamond_finial(0.88, post_mat)

    # ----- bottom tier dishes (6 items around the rim) -----
    bz = 0.04  # sits on top of tier surface
    # caprese skewer bowl (mozzarella + tomato stack)
    b = add_bowl(-0.55, 0.30, bz + 0.02, 0.10, 0.05, bowl_white, "CapreseBowl")
    for i, col in enumerate([tomato, mozzarella, tomato, mozzarella]):
        add_food_blob(-0.55, 0.30, bz + 0.05 + i * 0.035, 0.022, col, f"Caprese_{i}", squash=0.9)

    # hummus bowl
    add_bowl(-0.45, -0.15, bz + 0.02, 0.11, 0.05, bowl_white, "HummusBowl")
    add_food_blob(-0.45, -0.15, bz + 0.045, 0.085, hummus, "Hummus")

    # pomegranate bowl
    add_bowl(-0.05, -0.45, bz + 0.02, 0.10, 0.045, bowl_white, "PomegranateBowl")
    for i in range(14):
        ang = i * 0.55
        rr = 0.04 + (i % 3) * 0.012
        add_food_blob(-0.05 + math.cos(ang) * rr, -0.45 + math.sin(ang) * rr, bz + 0.06,
                      0.012, pomegranate, f"Pom_{i}", squash=0.9)

    # gazpacho/tomato glass
    add_glass(0.30, -0.40, bz + 0.005, 0.07, 0.085, glass_mat, "SoupGlass")
    add_food_blob(0.30, -0.40, bz + 0.085, 0.06, soup, "SoupInside", squash=0.3)

    # berries glass (right side)
    add_glass(0.60, -0.10, bz + 0.005, 0.075, 0.085, glass_mat, "BerriesGlass")
    for i in range(20):
        ang = i * 0.7
        rr = 0.04 + (i % 4) * 0.01
        add_food_blob(0.60 + math.cos(ang) * rr, -0.10 + math.sin(ang) * rr,
                      bz + 0.07 + (i % 3) * 0.012, 0.013, berries, f"Berry_{i}", squash=0.9)

    # ----- middle tier dishes (5 items) -----
    mz = 0.42 + 0.04
    # seared tuna with edamame
    add_bowl(-0.40, 0.20, mz + 0.02, 0.095, 0.045, bowl_white, "TunaBowl")
    add_food_blob(-0.40, 0.20, mz + 0.045, 0.06, tuna, "TunaBlock", squash=0.45)
    for i in range(8):
        ang = i * 0.785
        add_food_blob(-0.40 + math.cos(ang) * 0.065, 0.20 + math.sin(ang) * 0.065,
                      mz + 0.04, 0.012, edamame, f"Eda_{i}", squash=0.8)

    # risotto / mac & cheese gratin
    add_bowl(0.00, 0.25, mz + 0.02, 0.095, 0.045, bowl_white, "RisottoBowl")
    add_food_blob(0.00, 0.25, mz + 0.04, 0.085, risotto, "Risotto", squash=0.5)

    # salmon
    add_bowl(0.40, 0.20, mz + 0.02, 0.095, 0.045, bowl_white, "SalmonBowl")
    bpy.ops.mesh.primitive_cube_add(size=0.10, location=(0.40, 0.20, mz + 0.06))
    sal = bpy.context.active_object
    sal.name = "SalmonFillet"
    sal.scale = (1.0, 0.7, 0.4)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bpy.ops.object.modifier_add(type="BEVEL")
    sal.modifiers["Bevel"].width = 0.008
    bpy.ops.object.shade_smooth()
    assign(sal, salmon)

    # pasta / orzo
    add_bowl(-0.18, -0.18, mz + 0.02, 0.095, 0.045, bowl_white, "PastaBowl")
    add_food_blob(-0.18, -0.18, mz + 0.04, 0.08, pasta, "Pasta", squash=0.55)

    # mini pot pie
    add_bowl(0.18, -0.18, mz + 0.02, 0.095, 0.045, bowl_white, "PieBowl")
    add_food_blob(0.18, -0.18, mz + 0.055, 0.075, pastry, "PieTop", squash=0.7)

    # ----- top tier dishes (3 dessert glasses) -----
    tz = 0.84 + 0.04
    # panna cotta with berries
    add_glass(-0.20, 0.05, tz + 0.005, 0.06, 0.085, glass_mat, "PannaGlass")
    add_food_blob(-0.20, 0.05, tz + 0.055, 0.05, panna, "PannaFill", squash=0.6)
    for i in range(5):
        ang = i * 1.25
        add_food_blob(-0.20 + math.cos(ang) * 0.025, 0.05 + math.sin(ang) * 0.025,
                      tz + 0.085, 0.012, berries, f"PannaBerry_{i}", squash=0.9)

    # chocolate mousse
    add_glass(0.00, -0.10, tz + 0.005, 0.06, 0.085, glass_mat, "MousseGlass")
    add_food_blob(0.00, -0.10, tz + 0.05, 0.055, chocolate, "MousseFill", squash=0.65)
    add_food_blob(-0.015, -0.10, tz + 0.09, 0.015, chocolate, "Truffle1", squash=1.0)
    add_food_blob(0.020, -0.09, tz + 0.092, 0.014, chocolate, "Truffle2", squash=1.0)

    # tiramisu
    add_glass(0.22, 0.05, tz + 0.005, 0.06, 0.085, glass_mat, "TiramisuGlass")
    add_food_blob(0.22, 0.05, tz + 0.05, 0.055, tiramisu, "TiramisuFill", squash=0.65)
    # cocoa dots on top
    for i in range(7):
        ang = i * 0.9
        rr = 0.018 + (i % 2) * 0.01
        add_food_blob(0.22 + math.cos(ang) * rr, 0.05 + math.sin(ang) * rr,
                      tz + 0.092, 0.008, chocolate, f"Cocoa_{i}", squash=0.7)

    # ----- lighting & camera (just so the GLB has sane defaults) -----
    bpy.ops.object.light_add(type="AREA", location=(2, -2, 3))
    bpy.context.object.data.energy = 600
    bpy.context.object.data.size = 3
    bpy.ops.object.light_add(type="AREA", location=(-2, 2, 2.5))
    bpy.context.object.data.energy = 300
    bpy.context.object.data.size = 3

    bpy.ops.object.camera_add(location=(2.0, -2.0, 1.6), rotation=(math.radians(70), 0, math.radians(45)))
    bpy.context.scene.camera = bpy.context.active_object

    # world background
    world = bpy.data.worlds["World"] if "World" in bpy.data.worlds else bpy.data.worlds.new("World")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (1.0, 1.0, 1.0, 1.0)
        bg.inputs[1].default_value = 1.0


def export_glb(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format="GLB",
        export_apply=True,
        export_yup=True,
    )
    print(f"Wrote {path}")


if __name__ == "__main__":
    build_tray()
    export_glb(OUT_PATH)

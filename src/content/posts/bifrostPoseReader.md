---


author: Iván Cuenca Ruiz

date: 2023-04-12

title: Bifrost pose reader

thumbnail: /images/posts/bifrostPoseReader/thumbnail.gif

excerpt: How to create a pose reader applying the barycentric coordinate system.

download: https://ivancuencarigging.gumroad.com/l/PoseReader

tags: [bifrost]
---

![barycentric gif](/images/posts/bifrostPoseReader/thumbnail.gif)

<br>

# Barycentric coordinate system
The barycentric coordinates are a way of expressing the location of a point within a triangle using proportions based on areas. It's like dividing the triangle into smaller areas and using those areas to describe where the point is in relation to them. This is known as areal coordinates and it's a simple way to understand how a point is positioned within a triangle using only area ratios.

So once we have 3 points (**ABC**) and a point (**P**) we can calculate the area of **ABC**, **PAB**, **PBC** and **PCA**.

<img class="img-small" src="//images/posts/bifrostPoseReader/ABCP.png" alt= "triangles ABCP">

Once you have the area of each triangle, you can then use these values to determine the barycentric coordinates of **P**. 

- The barycentric coordinate for point **P** with respect to vertex **A** = Area(**PBC**) / Area(**ABC**)
- The barycentric coordinate for point **P** with respect to vertex **B** = Area(**PCA**) / Area(**ABC**)
- The barycentric coordinate for point **P** with respect to vertex **C** = Area(**PAB**) / Area(**ABC**)

<br>

# INPUTS
- Geometry **triangulated**
- Driver: transform / locator

<br>

# STEPS
1. [Find the projected point (**P**) on the geometry using a vector](#step-1)
2. [Determine the face on which point **P** is located](#step-2)
3. [Extract the vertices of the face where we are **ABC**](#step-3)
4. [Calculate the areas of **ABC**, **PBC**, **PCA**, **PAB**](#step-4)
5. [Output](#step-5)

<br>

<h2 id="step-1">Find the projected point (P) on the geometry using a vector</h2>

In order to find point **P**, we'll need our driver, which is placed in the geometry's center and a direction vector. This vector can be passed as value (1, 0, 0) if we want to use the X axis or we can have an input in our bifrost node so we can decide which axis we want to use.

<img class="img-medium" src="//images/posts/bifrostPoseReader/vector.gif" alt="vector gif">

To project **p** onto the geometry, we'll use the node **get_raycast_locations**. This node needs to be given the inputs as lists. Therefore, we'll use **build_array** to turn our data into lists.

- mesh &rarr; "get_raycast_locations.geometry"
- translation &rarr; "get_raycast_locations.positions"
- vector dirección &rarr; "get_raycast_locations.directions"

Once our **get_raycast_locations** is working, we'll need to access the point **p**. To do this, we must use the node **sample_property**. The sample_data is the output we're looking for.
- mesh &rarr; "sample_property.geometry"
- "get_raycast_locations.locations" &rarr; "sample_property.locations"

![raycast bifrost graph](//images/posts/bifrostPoseReader/raycast_graph.png)

<br>

<h2 id="step-2">Determine the face on which point P is located</h2>

To determine the closest face, we'll use the **get_closest_locations** node. This node provides us valuable information, such as the closest vertex or the closest face. To extract this information, we'll create a **value** node and set its type as **GeoLocation**.

<img class="img-small" src="//images/posts/bifrostPoseReader/geoLocation_value_node.png" alt="geoLocation value node">

The output is a list, so we'll use the **first_in_array** node to get the first value.

![closest face graph](//images/posts/bifrostPoseReader/closest_face_graph.png)

<br>

<h2 id="step-3">Extract the vertices of the face where we are ABC</h2>

To obtain the 3 vertices that form our face, we need to use the **get_mesh_structure** node.

![face vertex graph](//images/posts/bifrostPoseReader/face_vertex_graph.png)

<br>

<h2 id="step-4">Calculate the areas of ABC, PBC, PCA, PAB</h2>

This step may seem very complex, but it'ss as simple as looking for the formula on the internet and applying it with bifrost nodes. The area formula for a triangle is the following:

<p class="frame"> | (B - A) x (C - A) | / 2 </p>

We need to calculate the area of **ABC**, **PBC**, **PCA**, **PAB**

![area graph](//images/posts/bifrostPoseReader/area_graph.png)

<br>

<h2 id="step-5">Output</h2>

As we said at the beginning of the post, once we have all the areas, the only thing we need to do is to divide the areas by the area of **ABC**.
So, for example, the weight of **A** = Area(**PBC**) / Area(**ABC**).

Apart from that, in the image you can see the way I've found to create an empty array and fill it only with the values of the vertex of the face we are on.

![output](//images/posts/bifrostPoseReader/output.png)

<br>

The sum of all our weights must be equal to 1 and, since they are values between 0 and 1, we can use them to trigger our blendshapes directly.

<br>

I am providing the example scene for download, you can find all the weights connected in the driver, so if you rotate the locator, you'll see the output.

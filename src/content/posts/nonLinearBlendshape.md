---


author: Iván Cuenca Ruiz

date: 2023-11-02

title: Bifrost non linear blendshape

thumbnail: /images/posts/bifrostNonLinearBlendshape/example_01.gif

excerpt: How to use a quadratic spline interpolation for a blendshape.

download: https://ivancuencarigging.gumroad.com/l/NonLinearBlendshape

tags: [bifrost]
---

![non linear blendshape gif](/images/posts/bifrostNonLinearBlendshape/example_01.gif)

# Quadratic spline interpolation

The quadratic spline interpolation is a method used in mathematics to approximate a smooth curve or function that passes through a set of given data points.

In our case we will be dealing with 3 different shapes, the **base** or **B**, the **target** or **T** and the **middle** or **M**.

The **M** will be calculated automatically finding the middle position and adjusting it with a matrix transformation.

<br>

# Result
In this example, you can see how the adjustment of the matrix works, by translating, rotating, and scaling.
<img class="img-medium" src="/images/posts/bifrostNonLinearBlendshape/example_02.gif" alt="non linear blendshape example 03 gif">

<br>

# Bifrosts
If you're not interested in the Bifrost node part or simply want to try it out, at the end of the post, you'll find a download button with the cube scene.

<br>

To manipulate the vertices of a geometry in Bifrost, you must access to their point positions. When dealing with the base and target shapes, the process is straightforward: you can directly connect the geometry inputs to the **get_point_position** node.

To calculate the middle shape's point positions, as mentioned earlier, we will apply the following formula:
<p class="frame"> (B + A) / 2 </p>

<img class="img-medium" src="/images/posts/bifrostNonLinearBlendshape/middle_pp.png" alt= "middle points positions graph">

Now that we have obtained the point positions for **B**, **T**, and **M**, it's important to note that if we use these three shapes for the quadratic spline, the result will look like a typical blendshape with linear interpolation.

To solve this, we will use the matrix of a locator and add its position to **M**. It's important to consider that if we add the locator's matrix to all the vertices, the entire geometry will shift. To avoid this, we will identify the vertices that have been moved (delta) by using the formula (B-A). Then, we will calculate the length of each vector, determine the maximum length among all vectors, and normalize all the vectors based on this maximum value, so the normalized lengths will be "length/max_length."
<img class="img-medium" src="/images/posts/bifrostNonLinearBlendshape/normalized_lengths.png" alt= "normalized lengths graph">

Now that we have the normalized lengths, we need the matrix of the locator, as we want to be able to tweak the pivot I also added a inverseMatrix, to multiply the **M** by the matrix we need to convert the vector 3 of the **M** point positions to a vector 4, it is important to set the W to 1 or it won't work, once we have the multiplication we convert it back again to vector 3.

<img class="img-medium" src="/images/posts/bifrostNonLinearBlendshape/matrix_multiply.png" alt= "matrix multiply graph">

Lastly, with **M** (mid_pp), normalized lengths (for_each), and the matrix (vector3_to_vector5), we have to subtract **M** from the matrix. Then, we will multiply it by the normalized lengths and, finally, add **M** back to obtain our correct **M**.

<img class="img-medium" src="/images/posts/bifrostNonLinearBlendshape/m_result.png" alt= "correct M result graph">

<br>

# Quadratic spline formula

<p class="frame"> S(v) = T(2v^2 - v) + M(-4v^2 + 4v) + B( 2v^2 - 3v + 1) </p>

v = Value of the blendshape (0 to 1)

S = Final shape

T = Target shape

M = Middle shape

B = Base shape

![quadratic spline graph](/images/posts/bifrostNonLinearBlendshape/quadratic_spline.png)

As shown in this graph, you just need to follow the formula. Remember that to see the result, you need to convert your point positions back to a geometry using the **set_point_position** node."

<br>

# Source links

- [Alexandre Alin](https://youtu.be/KHxUX1V-z-M?si=OmGTTenWxF-lILxF) -- (Quadratic spline with 3 targets - base, middle and target)

- [C.G. From SPACE](https://cgfromspace.blogspot.com/2013/02/face-rigging-tutorial-non-linear-shape.html) -- (Post with the maths)

- [Peck Kanjanasahas](https://www.linkedin.com/posts/peck-kanjanasahas-a704672b_continue-experimenting-more-on-bifrost-this-activity-7124218131006324737-WTWG?utm_source=share&utm_medium=member_desktop) -- (Another example of bifrost compound using a vector for the bulge effect)

<br>

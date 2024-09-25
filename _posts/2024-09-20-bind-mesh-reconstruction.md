---
layout: post
title: Bind Mesh Reconstruction
date: 2024-09-20 08:00 -0600
math: true
---

## Standard Skinning Deformation

Most of the time in games, we are looking to deform a mesh driven by a particular skeletal pose which has been changed from the bind pose.  We have a bind mesh which lines up to this bind pose of the skeleton, and we can use the skinning equation to solve for the deformed mesh -- pretty straight-forward:

$$
\begin{equation}
  \mathbf{v'}=\sum_{i=1}^{N}w_{i}\mathbf{v}_{b}\mathbf{K}_{i}
\end{equation}
$$

Where:
- $$\mathbf{v'}$$ is the deformed vertex position
- $$w_{i}$$ are the skin weights
- $$\mathbf{v}_{b}$$ is the bind-pose vertex position
- $$\mathbf{K}_{i}$$ is the skinning matrix for the joint i, which is the inverse bind pose matrix * the current/deformed pose matrix for the joint.
- $$N$$ is the number of influences that we are skinning each vert to

We can easily demonstrate this process in Maya anytime we skin a mesh to skeleton, and then start moving the skeleton around.  Maya conveniently lets us revert back to the undeformed mesh via the "Go to Bind Pose" command.

## Inverse deformation

However, there are times where we need to author a mesh in a pre-deformed configuration.  For example, if we have a mesh which is not deforming to our liking, and we would like to create a corrected deformation by hand (by remodeling in the deformed pose).  In this case, we would probably need to remodel the mesh without skin weights in Maya, copy the weights back onto it, and then re-export the corresponding new bind mesh to engine.  However, we have no good way in Maya to get this new bind mesh.  

However, with a bit of simple math and Maya API code, we can do this pretty easily.

### The Math

In order to do this, we just need to solve for $$\mathbf{v}_{b}$$.

Since we know that:

$$
\begin{equation}
  \mathbf{v'}=\sum_{i=1}^{N}w_{i}\mathbf{v}_{b}\mathbf{K}_{i}
\end{equation}
$$

We can also rearrange this to:

$$
\begin{equation}
  \mathbf{v'}=\mathbf{v}_{b}\sum_{i=1}^{N}w_{i}\mathbf{K}_{i}
\end{equation}
$$

and then multiply by the inverse:

$$
\begin{equation}
  \mathbf{v}_{b}=\mathbf{v'}\left(\sum_{i=1}^{N}w_{i}\mathbf{K}_{i}\right)^{-1}
\end{equation}
$$

Now that we have the simple math, we just need to write something up using Maya API.

## Code

For the full code and example scene, see [Bind Mesh Reconstruction](https://github.com/steveontheweb/bind_mesh_reconstruction)

Here is the main part of the code, which does the actual reconstruction of the mesh, given a deformed mesh (with skin, but improper bind pose), and two skeleton poses (one is the bind pose, one is the current pose).

Overall, you can see this is a pretty simple operation.

```python      
bind_verts = []
vertex_index = 0
print("Reconstructing {} vertices".format(num_vertices))
for i in range(0, len(weights), num_influences):
    cur_vertex = source_points[vertex_index]
    vertex_weights = weights[i:i + num_influences]
    weighted_skin_matrix = om.MMatrix([0.0] * 16)
    for j, weight in enumerate(vertex_weights):
        if weight > 0.0:
            joint_name = joints[j]
            current_joint_matrix = cached_deformed_pose[joint_name]                   
            bind_joint_matrix = cached_bind_pose[joint_name]
            skin_matrix = bind_joint_matrix.inverse() * current_joint_matrix
            weighted_skin_matrix += weight * skin_matrix
    bind_vertex = cur_vertex * weighted_skin_matrix.inverse()
    bind_verts.append(bind_vertex)
    vertex_index += 1
    
duplicate_mesh_fn.setPoints(bind_verts, space=om.MSpace.kWorld)

# Now, we want to bind the new mesh to the original bind pose, and copy weights by index
cmds.currentTime(bind_pose_time)
cmds.select(clear=True)
weights, influence_indices = get_skin_weights(skin_cluster_name)
target_skin_cluster_name = cmds.skinCluster(joints, duplicate_mesh, toSelectedBones=True, bindMethod=0, skinMethod=0)[0]
set_skin_weights(target_skin_cluster_name, weights, influence_indices)
```
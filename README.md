# Tiling Crosses

I was doodling with crosses on graph paper and was surpised to see that I could cover the graph paper with only cross shapes. They also look pretty neat when colored oddly, so I wrote this code to play with them more efficiently.

## The logic behind `transform_point`:

I wanted to note how I came up with the formula for `transform_point`. I need to talk to my old Linear Algebra professor to get his perspective on how I might have been able to solve this more efficiently somehow.

The goal is to map a point in `p` (a square field of points (really also squares))
to the center of a cross in `c` (a square field of crosses turned caddy-corner).

Graph paper and square counting led to the following table (where x is the row, y is the column and indices start at 1):


| side length of `p` (called `n`) | 1 | 2 | 3 | 4  |
|--------------------|---|---|---|----|
| side length of `c` | 3 | 6 | 9 | 12 |
| x_0 in `c`         | 2 | 3 | 4 | 5  |
| y_0 in `c`         | 2 | 2 | 2 | 2  |


Those are some very easily predicted patterns and we can get the following information from them:

- the origin in `p` : `(1, 1)` is mapped onto `(n + 1, 2)` in `c`
- the number of tiles required to map a `p` of size `n` to `c` is `n * 3`

By inspecting the graph, we can also see the following shifts:

- `(x + 1, y)` corresponds to `(x + 2, y + 1)`. When you shift a square to the right in `p`, the corresponding center square in `c` is shifted to the right 2 and down 1 (In graphics, the vertival axis typically goes from top to bottom).
- `(x, y + 1)` corresponds to `(x - 1, y + 2)`. Similar explanation to the above.

Now a formula can start to be derived. We can scale the shifts in `x` and `y` by multiplying by a constant and to make it a real formula instead of just a correlation we simply add the offset from the orgin:

`(x + dx, y + dy) -> (n + 1, 2) + dx(x + 2, y + 1) + dy(x -1, y + 2)`

If we simply set `x` and `y` to `0`, we end up with a formula for coordinates from the origin:

`(dx, dy) -> (n + 1, 2) + dx(2, 1) + dy(-1, 2)`

Finally, though I've been using indices starting at one, in programming we usually start indices at zero. It's a simple matter to subtract one from the origin part of the formula. In this final form, I'm also renaming `dx` to `x` and `dy` to `y` because at this point they're offsets from the origin just like any other points.


`(x, y) -> (n, 1) + x(2, 1) + y(-1, 2)`


### Generalization

I'm pretty sure this generalizes to vector spaces of any dimensionality. To get from space `A` to space `B`, add the origin in `B` to a constant times a whatever the unit vector in `A` maps to in `B` for each unit vector in A.

## TypeScript

This is also the first time I've really used TypeScript. By opening the directory in VSCode and Running the build task once, I get compilation on save! NOTE: I'm putting all js/ts files in the ts/ folder. The js/ folder is a build artifact of the ts/ folder and I'm having git ignore it!

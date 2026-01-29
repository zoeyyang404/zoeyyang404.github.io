---
title: "3 steps to build own R package – Rcpp"
date: "Sat, 13 Mar 2021 18:10:19 +0000"
draft: false
slug: "3-steps-to-build-own-r-package-rcpp"
tags: []
categories: []
math: true
---
<span class="has-inline-color" style="color:#0a6b29">This blog is to give ideas how to build R package through Rcpp and C++. Here we assume our readers are confident of C++, Linux and R.</span>

This semester we have been trained to use C++ and Rcpp to write the R package. It is well known that the computing speed of R is slower than C++. Rcpp is an R Package that combines C++ and R. With Rcpp, it could easily transfer the algorithm or functions between R and C++, providing high-performance statistical computing to most R users. It is useful when statisticians want to develop their own R package. So, I will write it in 3 steps and using an Example.

------------------------------------------------------------------------

# Step 1: Write your own algorithm in C++

Firstly, you have to write your own algorithm in C++ in a Linux system. And next, we have to add some code in C++ to make sure it could be translated by R:

- Add \#include\<Rcpp.h\> at the beginning
![](/old_posts_image/18/2021/03/image.png)


- Add //\[\[Rcpp::export\]\] in your main function
![](/old_posts_image/18/2021/03/image-1.png)

- Add user interrupt through <span class="has-inline-color has-quaternary-color">Rcpp::checkUserInterrupt()</span>. It allows users to terminal algorithm when it runs too long.

![](/old_posts_image/18/2021/03/image-7.png)


------------------------------------------------------------------------

# Step 2: Build package

After obtaining our ‘cpp’ algorithm, we have to package it as a ‘zip’ file so it could be easily downloaded by anyone who wants to implement it in R. To do so, we have two simple steps:

## 1. Building Skeleton Folder

Skeleton folder just like the skeleton, containing all the main programs here. It is very simple to create: in R, run the code:

``` wp-block-code
package.skeleton(“The name of package”, cpp_files=”path to your c++ file”, example_code=FALSE) 
```

In my example, I created a package called ‘finaljarvismarch’, and write the path to my cpp file in ‘cpp_files’. If example_code=TRUE, the package will contain an example code.

<img src="/old_posts_image/18/2021/03/image-3.png"
     style="max-width: 584px;">

This creates the package skeleton in the working directory. It contains three files and three folders:

- Man: It contains the Rd file, which is the description shows in R.
- R: It contains all “.R” files written by R.
- Src: It contains all “.cpp” files written by C++.

We could manually put our further R function or C++ function in different folders.

<img src="/old_posts_image/18/2021/03/image-4.png"
     style="max-width: 489px;">

## 2. Building Package

Once we got the skeleton folder, run the command in terminal to create the package:

``` wp-block-code
R CMD build PackageDirectory/PackageSkeletonName 
```

This builds the package [tarball](https://en.wikipedia.org/wiki/Tar_(computing)), which can then be sent to and installed on any machine running R.

<img src="/old_posts_image/18/2021/03/image-5.png"
     style="max-width: 635px;">

------------------------------------------------------------------------

# Step 3: Checking instalment

Until now, we have successfully create a package. However, we have to test if it could be install appropriately.

Run the command in the terminal in the directory:

``` wp-block-code
 R CMD INSTALL PackageTarBallName
```

<img src="/old_posts_image/18/2021/03/image-6.png"
     style="max-width: 654px;">

Luckily without any error! Now, our package could be downloaded as a tarball by any user, and successfully install in R. To use package, directly run: <span class="has-inline-color has-quaternary-color">library(‘PackageTarBallName’)</span>

------------------------------------------------------------------------

# Example: Jarvis March algorithm

We are asked to build a [Jarvis March](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm) package, you could download the <a href="https://livelancsac-my.sharepoint.com/:u:/g/personal/yangz40_lancaster_ac_uk/EZaiLkjQfzVBvixEsiKZHc0Bjj9adHBO261iv7gYzH-NFg" rel="noreferrer noopener" target="_blank">tar file</a> here. After download it, it could be installed easily

- Run the command in the terminal: <span class="has-inline-color has-quaternary-color">R CMD INSTALL finaljarvismarch</span>
- Run the code in R: <span class="has-inline-color has-quaternary-color">library(finaljarvismarch)</span>

Now you could use Jarvis march algorithm for 2 dimension data. In this package, it contains two functions:

- findpoint_jarvis(x,y): inputting the x and y, it outputs the points in the convex hull.
- plot_jarvis(x,y): inputting x and y, it returns a plot containing all the data points and convex hull.

For example, simulating 100 points, and run the functions:

<img src="/old_posts_image/18/2021/03/image-9.png"
     style="max-width: 586px;">

x and y is the corresponded coordinates of points on the convex hull, and we could also draw the plot:

<img src="/old_posts_image/18/2021/03/image-10.png"
     style="max-width: 522px;">

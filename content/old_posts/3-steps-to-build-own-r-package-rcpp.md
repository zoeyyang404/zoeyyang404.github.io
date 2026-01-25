---
title: "3 steps to build own R package – Rcpp"
date: "2021-03-13T18:10:19+00:00"
draft: false
slug: "3-steps-to-build-own-r-package-rcpp"
tags: ["","","",""]
categories: ["","","",""]
aliases: ["https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/2021/03/13/3-steps-to-build-own-r-package-rcpp/"]
---
<span class="has-inline-color" style="color:#0a6b29">This blog is to give ideas how to build R package through Rcpp and C++. Here we assume our readers are confident of C++, Linux and R.</span>

This semester we have been trained to use C++ and Rcpp to write the R package. It is well known that the computing speed of R is slower than C++. Rcpp is an R Package that combines C++ and R. With Rcpp, it could easily transfer the algorithm or functions between R and C++, providing high-performance statistical computing to most R users. It is useful when statisticians want to develop their own R package. So, I will write it in 3 steps and using an Example.

------------------------------------------------------------------------

# Step 1: Write your own algorithm in C++

Firstly, you have to write your own algorithm in C++ in a Linux system. And next, we have to add some code in C++ to make sure it could be translated by R:

- Add \#include\<Rcpp.h\> at the beginning

<figure class="wp-block-image size-large is-resized">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image.png" class="wp-image-204" loading="lazy" decoding="async" width="371" height="175" />
</figure>

- Add //\[\[Rcpp::export\]\] in your main function

<figure class="wp-block-image size-large is-resized">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-1.png" class="wp-image-205" loading="lazy" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-1.png 602w, /old_posts_image/wp-content/uploads/sites/18/2021/03/image-1-300x46.png 300w" sizes="auto, (max-width: 670px) 100vw, 670px" width="670" height="102" />
</figure>

- Add user interrupt through <span class="has-inline-color has-quaternary-color">Rcpp::checkUserInterrupt()</span>. It allows users to terminal algorithm when it runs too long.

<figure class="wp-block-image size-large is-resized">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-7.png" class="wp-image-211" loading="lazy" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-7.png 602w, /old_posts_image/wp-content/uploads/sites/18/2021/03/image-7-300x69.png 300w" sizes="auto, (max-width: 681px) 100vw, 681px" width="681" height="156" />
</figure>

------------------------------------------------------------------------

# Step 2: Build package

After obtaining our â€˜cppâ€™ algorithm, we have to package it as a â€˜zipâ€™ file so it could be easily downloaded by anyone who wants to implement it in R. To do so, we have two simple steps:

## 1. Building Skeleton Folder

Skeleton folder just like the skeleton, containing all the main programs here. It is very simple to create: in R, run the code:

``` wp-block-code
package.skeleton(â€œThe name of packageâ€, cpp_files=â€path to your c++ fileâ€, example_code=FALSE) 
```

In my example, I created a package called â€˜finaljarvismarchâ€™, and write the path to my cpp file in â€˜cpp_filesâ€™. If example_code=TRUE, the package will contain an example code.

<figure class="wp-block-image size-large">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-3.png" class="wp-image-207" loading="lazy" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-3.png 584w, /old_posts_image/wp-content/uploads/sites/18/2021/03/image-3-300x116.png 300w" sizes="auto, (max-width: 584px) 100vw, 584px" width="584" height="225" />
</figure>

This creates the package skeleton in the working directory. It contains three files and three folders:

- Man: It contains the Rd file, which is the description shows in R.
- R: It contains all â€œ.Râ€ files written by R.
- Src: It contains all â€œ.cppâ€ files written by C++.

We could manually put our further R function or C++ function in different folders.

<figure class="wp-block-image size-large">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-4.png" class="wp-image-208" loading="lazy" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-4.png 489w, /old_posts_image/wp-content/uploads/sites/18/2021/03/image-4-300x80.png 300w" sizes="auto, (max-width: 489px) 100vw, 489px" width="489" height="130" />
</figure>

## 2. Building Package

Once we got the skeleton folder, run the command in terminal to create the package:

``` wp-block-code
R CMD build PackageDirectory/PackageSkeletonName 
```

This builds the packageÂ [tarball](https://en.wikipedia.org/wiki/Tar_(computing)), which can then be sent to and installed on any machine running R.

<figure class="wp-block-image size-large is-resized">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-5.png" class="wp-image-209" loading="lazy" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-5.png 541w, /old_posts_image/wp-content/uploads/sites/18/2021/03/image-5-300x83.png 300w" sizes="auto, (max-width: 635px) 100vw, 635px" width="635" height="175" />
</figure>

------------------------------------------------------------------------

# Step 3: Checking instalment

Until now, we have successfully create a package. However, we have to test if it could be install appropriately.

Run the command in the terminal in the directory:

``` wp-block-code
 R CMD INSTALL PackageTarBallName
```

<figure class="wp-block-image size-large is-resized">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-6.png" class="wp-image-210" loading="lazy" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-6.png 577w, /old_posts_image/wp-content/uploads/sites/18/2021/03/image-6-300x138.png 300w" sizes="auto, (max-width: 654px) 100vw, 654px" width="654" height="301" />
</figure>

Luckily without any error! Now, our package could be downloaded as a tarball by any user, and successfully install in R. To use package, directly run: <span class="has-inline-color has-quaternary-color">library(â€˜PackageTarBallNameâ€™)</span>

------------------------------------------------------------------------

# Example: Jarvis March algorithm

We are asked to build a [Jarvis March](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm) package, you could download the <a href="https://livelancsac-my.sharepoint.com/:u:/g/personal/yangz40_lancaster_ac_uk/EZaiLkjQfzVBvixEsiKZHc0Bjj9adHBO261iv7gYzH-NFg" rel="noreferrer noopener" target="_blank">tar file</a> here. After download it, it could be installed easily

- Run the command in the terminal: <span class="has-inline-color has-quaternary-color">R CMD INSTALL finaljarvismarch</span>
- Run the code in R: <span class="has-inline-color has-quaternary-color">library(finaljarvismarch)</span>

Now you could use Jarvis march algorithm for 2 dimension data. In this package, it contains two functions:

- findpoint_jarvis(x,y): inputting the x and y, it outputs the points in the convex hull.
- plot_jarvis(x,y): inputting x and y, it returns a plot containing all the data points and convex hull.

For example, simulating 100 points, and run the functions:

<figure class="wp-block-image size-large is-resized">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-9.png" class="wp-image-215" loading="lazy" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-9.png 586w, /old_posts_image/wp-content/uploads/sites/18/2021/03/image-9-300x96.png 300w" sizes="auto, (max-width: 586px) 100vw, 586px" width="586" height="187" />
</figure>

x and y is the corresponded coordinates of points on the convex hull, and we could also draw the plot:

<figure class="wp-block-image size-large">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-10.png" class="wp-image-216" loading="lazy" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/03/image-10.png 522w, /old_posts_image/wp-content/uploads/sites/18/2021/03/image-10-294x300.png 294w" sizes="auto, (max-width: 522px) 100vw, 522px" width="522" height="532" />
</figure>




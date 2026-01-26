---
title: "How could particle filter track Thanos? – explaining particle filter without mathematics"
date: "Sat, 24 Apr 2021 23:43:24 +0000"
draft: false
slug: "how-could-particle-filter-track-thanos-explaining-particle-filter-without-mathematics"
tags: []
categories: []
math: true
---
This blog will give an general idea about the principle of particle filter without mathematical proofing.

Recently, we are given talks about particle filter (or sequential Monte Carlo). Particle filter has a wide application in signal processing, tracking objects, time series, finance, etc. In the beginning, I am also scared by the maths of particle filter, like partial differential equations and Bayesian stuff. However, the idea behind the particle filter is very straightforward and intuitive.

**Now, lets set a situation to explain it under the tracking problem without mathematics!**

# Scenario Setting

Assume we are agents of [the avengers](https://en.wikipedia.org/wiki/The_Avengers_(2012_film)) located in ‘chessboard’ country (that is because the map of this country is like a chessboard <img src="https://s.w.org/images/core/emoji/16.0.1/72x72/1f642.png" class="wp-smiley" style="height: 1em; max-height: 1em;" alt="🙂" /> ). One day Thanos came to this country and said he steal our magic stone and then he just left away and hid somewhere in our city.

**Our aim: we are told to trace him before the avengers came.**

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://sm.mashable.com/t/mashable_sea/feature/t/the-thanos/the-thanos-snap-for-real-lets-remove-humans-from-half-of-ear_bq2q.h720.jpg" decoding="async" alt="The Thanos snap for real: Let&#39;s remove humans from half of Earth - Science" />
<figcaption>He is Thanos. You only need to know he is a bad guy if you don’t know him. If we can’t find where he hides and take our magic stone back, he will destroy the whole world!!!! And the avengers will help us if we could successfully find his location!</figcaption>
</figure>

</div>

# How to find him?

Luckily, we have three clever dogs named ‘particle A’, ‘particle B’, and ‘particle C’. They have already remembered the smell of Thanos! And we are also clever enough to communicate with them.

Every 10 minutes, they could go head 1 grid in the map based on their own ideas. And then our dogs have to report their location and how likely Thanos come across these areas.

### Time=0 minutes

<div class="wp-block-image">

<figure class="aligncenter size-large">
<img src="/old_posts_image/18/2021/04/image-14.png" class="wp-image-268" loading="lazy" decoding="async" srcset="/old_posts_image/18/2021/04/image-14.png 572w, /old_posts_image/18/2021/04/image-14-300x195.png 300w" sizes="auto, (max-width: 572px) 100vw, 572px" width="572" height="371" />
</figure>

</div>

At the beginning, particle B said it is 90% sure there is Thanos’scent. So we think at the beginning Thanos are more likely to go across the middle way.

## Time=10 minutes

<div class="wp-block-image">

<figure class="aligncenter size-large">
<img src="/old_posts_image/18/2021/04/image-8.png" class="wp-image-261" loading="lazy" decoding="async" srcset="/old_posts_image/18/2021/04/image-8.png 532w, /old_posts_image/18/2021/04/image-8-300x186.png 300w" sizes="auto, (max-width: 532px) 100vw, 532px" width="532" height="330" />
</figure>

</div>

After 10 minutes, our dog moved to new locations and reported their location and their findings. Thanos seems go up from the middle way. as Particle A was 60% sure.

## Time=70 minutes

<div class="wp-block-image">

<figure class="aligncenter size-large">
<img src="/old_posts_image/18/2021/04/image-9.png" class="wp-image-262" loading="lazy" decoding="async" srcset="/old_posts_image/18/2021/04/image-9.png 522w, /old_posts_image/18/2021/04/image-9-300x187.png 300w" sizes="auto, (max-width: 522px) 100vw, 522px" width="522" height="326" />
<figcaption>The purple line is the real trace of Thanos</figcaption>
</figure>

</div>

At T=70, we report the most likely route to the avengers (blue line in the figure) based on our three dogs findings. We traced Thanos very well at the beginning. But after T=40, we are far away from his real trace! Finally, our task failed, the avengers could not find him, and he destroyed our world at the end!

<div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">

<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:33.33%">

<figure class="wp-block-image size-large">
<img src="/old_posts_image/18/2021/04/sfsfsfsfsfsf.gif" class="wp-image-263" loading="lazy" decoding="async" width="315" height="212" />
</figure>

</div>

<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:66.66%">

Why are we failed? Our dogs are clever, and we are clever. Wait! We track his route very well initially, but after time = 40, particle B and particle C always explore the bottom area. Particle B and particle C said they are not sure Thanos came here, but particle A always said he smelled Thanos’ scent. So we could only rely on Particle A. That’s why we sure Thanos go as particle A’s route.

</div>

</div>

> Particle filter without resampling
>
> The example above illustrates the principle of particle filter without resampling. Each time step, several particles will move follows the transition distribution (like our dogs follow their mind to go head). And based on the evidence (scent of Thanos in our case), we could get the possible location at each time step. Along the time, we could get a trace. However, particle filter without resampling always fails in the long run due to weight degeneracy that the trace is concluded from few particles (In our example, this means we only rely on Particle A after T=40).

## Time goes back

Okay, so now the avengers make the time back and we could search again. Particle B and Particle C always explore the locations in the right-bottom corner where Thanos obviously not been there. So let them find those locations is a waste.

**New rule: If one of the dogs found Thanos most likely came across their area, we introduce a new dog in this area to pinpoint search. Additionally, if a dog has the least amount of certainty, we remove this dog.**

## Time = 0 minutes

<div class="wp-block-image">

<figure class="aligncenter size-large">
<img src="/old_posts_image/18/2021/04/image-13.png" class="wp-image-267" loading="lazy" decoding="async" srcset="/old_posts_image/18/2021/04/image-13.png 545w, /old_posts_image/18/2021/04/image-13-300x199.png 300w" sizes="auto, (max-width: 545px) 100vw, 545px" width="545" height="361" />
</figure>

</div>

Particle B is 90% sure while Particle C is only 2% sure. So we move particle C and give one more dog on the area where Particle B is.

## Time = 10 minutes

<div class="wp-block-image">

<figure class="aligncenter size-large">
<img src="/old_posts_image/18/2021/04/image-11.png" class="wp-image-265" loading="lazy" decoding="async" srcset="/old_posts_image/18/2021/04/image-11.png 536w, /old_posts_image/18/2021/04/image-11-300x194.png 300w" sizes="auto, (max-width: 536px) 100vw, 536px" width="536" height="346" />
</figure>

</div>

Next, our particles remove follow their mind. Since Particle A is 60% sure it smelled Thanos, we introduce a new dog in its area. Since Particle C in the bottom grid only 5% sure it smelled Thanos, we discard it and let it go back home.

## Time = 70 minutes

<div class="wp-block-image">

<figure class="aligncenter size-large">
<img src="/old_posts_image/18/2021/04/image-10.png" class="wp-image-264" loading="lazy" decoding="async" srcset="/old_posts_image/18/2021/04/image-10.png 538w, /old_posts_image/18/2021/04/image-10-300x182.png 300w" sizes="auto, (max-width: 538px) 100vw, 538px" width="538" height="327" />
</figure>

</div>

As we see, at time 70 we successfully trace Thanos, and we save the world!

> Particle filter with resampling
>
> Due to the limitation of particle filter without sampling, we introduce the resampling scheme in the process. It is easy to understand as we duplicate particles when they have a high probability of getting the right path (like introducing a new dog in that area). In addition, we discard those particles with less probability to find the true path.

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555921064/shape/mentalfloss/spongebob_0_0.jpg?itok=FF47w3bl" loading="lazy" decoding="async" width="633" height="355" alt="14 Things You May Not Have Known About &#39;SpongeBob SquarePants&#39; | Mental Floss" />
</figure>

</div>

This is the intuitive idea behind particle filter! Now you could understand the whole process of particle filter!

For more reading:

<https://www.stats.ox.ac.uk/~doucet/doucet_johansen_tutorialPF2011.pdf> This is a really good review paper!

<http://wwwf.imperial.ac.uk/~nkantas/notes4ltcc.pdf> This is a really good tutorial! And the references are very famous papers!

This is a really good cartoon to show the whole process:

<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-4-3 wp-has-aspect-ratio">
<div class="wp-block-embed__wrapper">
<div class="iframe">
<div id="player">

</div>
<div class="player-unavailable">
<h1 id="an-error-occurred." class="message">An error occurred.</h1>
<div class="submessage">
Unable to execute JavaScript.
</div>
</div>
</div>
</div>
</figure>

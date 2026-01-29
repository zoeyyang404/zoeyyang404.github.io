---
title: "Handling human stubbornness when people think they are smarter than data science!"
date: "Sun, 25 Apr 2021 17:05:46 +0000"
draft: false
slug: "handling-human-stubbornness-when-people-think-they-are-smarter-than-data-science"
tags: []
categories: []
math: true
---
Last month, we had a problem-solving day talking about handling human stubbornness during the implementation of data science. You may hear data science could make good decisions, like [data science help groceries to make a better decision](https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/2021/04/02/association-analysis-in-retail-industry-how-grocery-stores-knows-pregnancy/). And you may be also familiar with the travel route planned by Google map! Like us, delivery companies also plan an optimized route for drivers. For example, drivers for delivery companies (e.g. Amazon) have to deliver hundreds of parcels to many different addresses every day. And these companies use vehicle routing models to compute the best routes for delivery drivers (maybe the routes has the least time).

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://assets.amazon.science/dims4/default/e644ebc/2147483647/strip/true/crop/1881x650+0+0/resize/1200x415!/quality/90/?url=http%3A%2F%2Famazon-topics-brightspot.s3.amazonaws.com%2Fscience%2Fa7%2Fa8%2Fe3fa71e646ca857ed5920ffc87f5%2Flast-mile-visual-cropped.png" loading="lazy" decoding="async" width="666" height="229" />
<figcaption>At left is a delivery route computed by the Last Mile team’s optimization software, at right the route that a delivery driver actually chose to drive. (Map details have been omitted.) Green symbols <em>(A and B)</em> indicate the driver’s starting locations, purple symbols <em>(also A and B)</em> the ending locations. – cited from Amazon</figcaption>
</figure>

</div>

However, usually, drivers deviate from the optimised delivery route computed by data science to reduce the journey time. This is because usually, they think they are more familiar with this area and have their own driving habits. Unfortunately, most time, they increase the time required to unload packages from the van at stops.

<div class="wp-block-image">

<figure class="aligncenter">
<img src="https://images.pond5.com/robot-vs-human-humanity-and-illustration-080489054_iconl_nowm.jpeg" decoding="async" alt="Stubbornness Illustrations ~ Stock Stubbornness Vectors | Pond5" />
</figure>

</div>

Data scientists always consider how accurate their model is but paying less consideration to monitor the implementation of the whole process. However, make sure the whole process as the plan is much harder than designing an efficient algorithm. Recently, Amazon and MIT hold a new <a href="https://www.amazon.science/blog/amazon-mit-team-up-to-add-driver-know-how-to-delivery-routing-models" rel="noreferrer noopener" target="_blank">competition</a>, that they want to find a solution that reducing the probability of drivers’ deviation.

Our group discussed this problem and considered 2 possible ways to help improve the drivers’ loyalty:

### **Specific personalised driver routes**

Most drivers are deviating from the route plan since they have their own driving habits. So, why not design an optimised route combined with their driving habits?

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://www.scotsman.com/images-i.jpimedia.uk/imagefetch/https://jpgreatcontent.co.uk/wp-content/uploads/2020/12/SKODAMarketplace002.jpg?width=2048&amp;enable=upscale" loading="lazy" decoding="async" width="458" height="293" alt="Skoda trials in-car alerts for discounts on fuel, food and more | The Scotsman" />
</figure>

</div>

We could collect information:

- Driver information: driving experience, driving years, age, familiarity with delivering area, customer satisfaction, etc…..
- Feedback from the driver: satisfaction about the route plan, reasons for deviations, unusual traffic report, etc…
- GPS data: track the deviation, estimated optimal time and real-time.

With these data, [reinforcement learning](https://en.wikipedia.org/wiki/Reinforcement_learning#:~:text=Reinforcement%20learning%20(RL)%20is%20an,supervised%20learning%20and%20unsupervised%20learning.) could learn how to design an optimised route incorporating drivers’ preference.

### **Reward and penalty system**

This idea is not related to techniques but psychology. It is also useful if we could set a reward and penalty system:

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://positivediscipline44.files.wordpress.com/2017/07/picture-for-parent-blog-2.gif" loading="lazy" decoding="async" width="304" height="198" alt="Positive Discipline – Don`t let your self be so concerned of raising a good kid that you forget you already have one." />
</figure>

</div>

•Reward drivers for loyalty to prescribed routes and reward drivers who deviate the route but finish their travel in a time shorter than optimised time.

•Penalties for deviations which cause delays

We only came up few ideas during the problem-solving day. There still are other good ideas to tackle this issue, and the competition of Amazon is operating now! During the discussion, we are given a video, and we found this is really helpful! (after 32 minutes, this video talks about the specific personalized route planning)

<figure class="wp-block-embed aligncenter is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-4-3 wp-has-aspect-ratio">
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

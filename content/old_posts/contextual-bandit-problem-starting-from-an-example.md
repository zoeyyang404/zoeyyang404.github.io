---
title: "Why does Amazon always guess our preference? – explaining contextual bandit problem without mathematics"
date: "2021-02-08T13:36:37+00:00"
draft: false
slug: "contextual-bandit-problem-starting-from-an-example"
tags: []
categories: []
aliases: ["https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/2021/02/08/contextual-bandit-problem-starting-from-an-example/"]
---
<span class="has-inline-color has-secondary-color">This blog will give you an idea of the rationale behind the recommendation system. How contextual bandit problem works in such a system? Hope this blog will give you an answer.</span>

During last semester, we are given a list of topics to discuss as a team. The fourth topic is bandit problem!

<div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">

<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:33.33%">

<figure class="wp-block-image size-large is-resized">
<img src="/old_posts_pics/18/2021/04/1_pcEsW85jbSIzsEONxn1XRQ.jpeg" class="wp-image-286" loading="lazy" decoding="async" srcset="/old_posts_pics/18/2021/04/1_pcEsW85jbSIzsEONxn1XRQ.jpeg 345w, /old_posts_pics/18/2021/04/1_pcEsW85jbSIzsEONxn1XRQ-259x300.jpeg 259w" sizes="auto, (max-width: 251px) 100vw, 251px" width="251" height="291" />
</figure>

</div>

<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:66.66%">

This is the two-arm bandit machine. Each time you have to choose to pull one arm to earn money. How will you do that? Which arm you will choose to pull? Probably try several times, and summarise some experience. Then you may have some rules to guide you to pull the arm.

This is the bandit problem which is clearly about how to make a good decision. In a two-arm bandit machine, it is to choose to pull which arm to earn more money. When it comes to the recommendation system, it is to choose the good news/products/videos to earn a more click-through rate!!!

</div>

</div>

# <span class="has-inline-color" style="color:#00983f">Amazonâ€™s secret â€“ recommendation system</span>

------------------------------------------------------------------------

<div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-9d6595d7 wp-block-columns-is-layout-flex">

<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">

<figure class="wp-block-image size-large">
<img src="/old_posts_pics/18/2021/02/recommendation-1-1024x350.png" class="wp-image-180" loading="lazy" decoding="async" srcset="/old_posts_pics/18/2021/02/recommendation-1-1024x350.png 1024w, /old_posts_pics/18/2021/02/recommendation-1-300x103.png 300w, /old_posts_pics/18/2021/02/recommendation-1-768x263.png 768w, /old_posts_pics/18/2021/02/recommendation-1-1536x525.png 1536w, /old_posts_pics/18/2021/02/recommendation-1.png 1558w" sizes="auto, (max-width: 1024px) 100vw, 1024px" width="1024" height="350" />
</figure>

</div>

<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">

When you open your Amazon, you may notice it automatically recommends products for you. And when you using Tictok, it probability recommends videos that most attracts you. That is a recommendation system.

</div>

</div>

> Judging by Amazonâ€™s success, the recommendation system works. The company reported a 29% sales increase to \$12.83 billion during its second fiscal quarter, up from \$9.9 billion during the same time last year. A lot of that growth arguably has to do with the way Amazon has integrated recommendations into nearly every part of the purchasing process.

Amazon benefits from its recommendation system by recommending personalised products to different customers. You may have noticed that once you open Amazon, it shows the recommendation for you that you are actually interested in. Similarly, you may notice that Yahoo! recommends news you interests in, Tiktok always knows your tastes in videos. Although they may use a different algorithm, such personalized recommendation could be done by contextual bandit algorithms. **A good recommendation system will always know you better than yourself !!** Now, letâ€™s look at what is contextual bandit problem through an example.

# <span class="has-inline-color" style="color:#019925">Looking at the contextual bandit problem through an example</span>

------------------------------------------------------------------------

------------------------------------------------------------------------

Assuming we have a website called â€˜click meâ€™ posting interesting news, and we make a profit from the click-through rate on web advertising. A list of companies asked us to put their advertisements on our website. In order to maximize our profit, we want to personalize these advertisements and attract our customers to click. In other words, we want to show specific advertisements to specific viewers. But how? This is the bandit problem.

## Collecting the contextual information

If we want to guess a personâ€™s preference, we firstly want to know more about this person. Similarly, to our company, we want to know more about our viewers, which is called context in bandit problem. These contexts may contain:

- Personal information: Gender, region, age, etcâ€¦
- Recent browsing records and click-through records: Even including how many seconds you spend in viewing one advertisement
- The preference of the categories of news: for example, our viewer may like the news of Justin Bieber, or they may focus on sales information.
- etcâ€¦

## Trying and learning how to guess

Okay dokey. Now we have lots of information about our viewers. Whatâ€™s the next step? If you want to guess a personsâ€™ favourite movie, you might want to show them some movies and observe their reactions. For example, if we show them â€˜Titanicâ€™ and they said they really love this movie, they probably like a romantic movie and we will show them more romantic movies to guess. If you show them â€˜The Lion Kingâ€™ and they said they do not like this movie, you will not show them more cartoon movies. (Just example, I love The Lion King!!!!)

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://i.imgflip.com/15at2x.jpg" loading="lazy" decoding="async" width="198" height="173" alt="Uh... is it Alien? - Imgflip" />
</figure>

</div>

Similarity, we have a list of advertisement from a list of companies. Which advertisement we choose to show for viewers with certain type?

<figure class="wp-block-image size-large">
<img src="/old_posts_pics/18/2021/02/contextualbanditdiag-1024x170.png" class="wp-image-181" loading="lazy" decoding="async" srcset="/old_posts_pics/18/2021/02/contextualbanditdiag-1024x170.png 1024w, /old_posts_pics/18/2021/02/contextualbanditdiag-300x50.png 300w, /old_posts_pics/18/2021/02/contextualbanditdiag-768x127.png 768w, /old_posts_pics/18/2021/02/contextualbanditdiag-1536x255.png 1536w, /old_posts_pics/18/2021/02/contextualbanditdiag-1600x265.png 1600w, /old_posts_pics/18/2021/02/contextualbanditdiag.png 1762w" sizes="auto, (max-width: 1024px) 100vw, 1024px" width="1024" height="170" />
</figure>

Similarly, each time, our system will give them a type of advertisement (that is choose an action), and watch their reaction. If guess correctly, the machine will gain â€˜rewardsâ€™ (that is you click the products), and such rewards will transfer to experience about this type of viewers. If guess incorrectly, the machine is â€˜regretâ€™ that do not guess viewers preference and try to guess again and again. After a long time, our machine could guess the preference of viewers correctly!

For example, for viewers age below 6 years old. When the machine shows the ads about toys, and childrenâ€™s clicked that ad. The machine will gain experience that children are more likely to click ads about toys. And next time our machine is more likely to put an advertisement about toys on our website.

After a while and huge data, this engine has cumulated enough information about viewers preference and has a high probability to guess the preference â€“ just like the process of learning (learn experience from success and try after failure!)

Now our company runs very well and could show certain advertisements to certain viewers! With a high click-through rate, we made lots of profit!!

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://pyxis.nymag.com/v1/imgs/8f8/e12/51b54d13d65d8ee3773ce32da03e1fa220-dogecoin.rsquare.w1200.jpg" loading="lazy" decoding="async" width="242" height="242" alt="Why Dogecoin Is Forcing People to Take It Seriously" />
</figure>

</div>

# <span class="has-inline-color" style="color:#089b4c">Extended reading</span>

This blog is only a general idea of multi-arm bandit problem, see more explanation including Maths please visit:

<figure class="wp-block-embed is-type-wp-embed is-provider-maddie-smith wp-block-embed-maddie-smith">
<div class="wp-block-embed__wrapper">
<blockquote>
<a href="https://www.lancaster.ac.uk/stor-i-student-sites/maddie-smith/2021/02/02/learn-from-your-mistakes-multi-armed-bandits/">Learn From Your Mistakes â€“ Multi-armed Bandits</a>
</blockquote>
<div class="iframe">
<div class="wp-embed post-204 post type-post status-publish format-standard hentry category-optimisation tag-operational-research tag-optimisation tag-statistics">
<p><a href="https://www.lancaster.ac.uk/stor-i-student-sites/maddie-smith/2021/02/02/learn-from-your-mistakes-multi-armed-bandits/" target="_top">Learn From Your Mistakes â€“ Multi-armed Bandits</a></p>
<div class="wp-embed-excerpt">
<p>In a recent talk given to the MRes students, I was asked for my opinion on a multi-armed bandit problem. In these working from home times, Iâ€™m sure most of us know of the combined dread and panic that comes with taking your microphone off â€¦ <a href="https://www.lancaster.ac.uk/stor-i-student-sites/maddie-smith/2021/02/02/learn-from-your-mistakes-multi-armed-bandits/" class="wp-embed-more" target="_top">Continue reading <span class="screen-reader-text">Learn From Your Mistakes â€“ Multi-armed Bandits</span></a></p>
</div>
<div class="wp-embed-footer">
<div class="wp-embed-site-title">
<a href="https://www.lancaster.ac.uk/stor-i-student-sites/maddie-smith" target="_top"><img src="/old_posts_pics/27/2020/11/cropped-S-3-32x32.png" class="wp-embed-site-icon" srcset="/old_posts_pics/27/2020/11/cropped-S-3-150x150.png 2x" width="32" height="32" /><span>Maddie Smith</span></a>
</div>
<div class="wp-embed-meta">
<div class="wp-embed-share">
<span class="dashicons dashicons-share"></span>
</div>
</div>
</div>
</div>
<div class="wp-embed-share-dialog hidden" role="dialog" aria-label="Sharing options">
<div class="wp-embed-share-dialog-content">
<div class="wp-embed-share-dialog-text">
<ul>
<li>WordPress Embed</li>
<li>HTML Embed</li>
</ul>
<div id="wp-embed-share-tab-wordpress-204-2399018556" class="wp-embed-share-tab" role="tabpanel" aria-hidden="false">
<p>Copy and paste this URL into your WordPress site to embed</p>
</div>
<div id="wp-embed-share-tab-html-204-2399018556" class="wp-embed-share-tab" role="tabpanel" aria-hidden="true">
<p>Copy and paste this code into your site to embed</p>
</div>
</div>
<span class="dashicons dashicons-no"></span>
</div>
</div>
</div>
</div>
</figure>

See more references on contextual bandits and reinforcement learning in depth please visit:

<https://towardsdatascience.com/contextual-bandits-and-reinforcement-learning-6bdfeaece72a>

<https://www.cs.ubc.ca/labs/lci/mlrg/slides/2019_summer_5_contextual_bandits.pdf>

And this video is really good to watch if you want to learn it at the beginning:

<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio">
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






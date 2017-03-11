<template>
	<div class="slider" ref="slider">
		<div class="content">
			<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
				<div class="post-content" itemprop="articleBody">
					<div class="mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
						<header class="post-header mdl-color-text--grey-800">
							<h1 class="post-title" itemprop="name headline">{{ page.title }}</h1>
							<p class="post-meta">
								<time :datetime="page.date | date_to_xmlschema" itemprop="datePublished">{{ page.date | date: "%b %-d, %Y" }}</time>
							</p>
							<hr>
						</header>
						{{ content }}
					</div>
				</div>
			</article>
		</div>
	</div>
</template>

<script>
export default {

};
</script>

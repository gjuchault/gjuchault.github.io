<template>
  <div class="projects">
    <div class="projects__project" v-for="project in projects">
      <Card>
        <div class="projects__project__title" :style="titleImage(project)">
          <h2 :style="titleStyles(project)">{{ project.title }}</h2>
        </div>
        <div class="projects__project__infos">
          <div class="projects__project__tags">
            <span class="projects__project__tags__tag" v-for="tag in project.tags">{{ tag }}</span>
          </div>
          <div class="projects__project__desc">
            {{ project.desc }}
          </div>
        </div>
        <div class="card__footer">
          <AppButton v-if="project.icon" :icon="project.icon" :light="false" @click="goTo(project)">Details</AppButton>
          <AppButton v-if="!project.icon" icon="github" :light="false" @click="goTo(project)">Details (on GitHub)</AppButton>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import projects from '../../data/projects.json';
import Card     from './Card.vue';
import Button   from './Button.vue';

export default {
  components: { AppButton: Button, Card },

  data() {
    return {
      projects
    }
  },

  mounted() {
    this.$el.parentNode.style.opacity = 0;
    this.$el.parentNode.offsetWidth; // reflow
    this.$el.parentNode.style.opacity = 1;
  },

  methods: {
    titleImage(project) {
      return { background: `url('${project.picture}') center / cover` };
    },

    titleStyles(project) {
      return { color: `#${project.color}`, backgroundColor: `rgba(${project.background})` };
    },

    goTo(project) {
      const $a  = document.createElement('a');
      $a.href   = project.repo;
      $a.target = '_blank';
      $a.click();
    }
  }
};
</script>

<style lang="scss">
@import '../main.scss';

.projects {
  .projects__project {
    padding-bottom: $projectsPaddingBottom;

    .card {
      padding: 0;
    }
  }
}

.projects__project__tags {
  margin-bottom: $tagsBottom;

  .projects__project__tags__tag {
    background-color: $itemsBorderColor;
    border-radius: $tagsRadius;
    color: $tagsColor;
    font-size: $tagsSize;
    font-weight: $tagsWeight;
    line-height: 1;
    padding: $tagsPadding;
    text-align: center;
    vertical-align: baseline;
    white-space: nowrap;

    &:not(:last-child) {
      margin-right: $tagsMargin;
    }
  }
}

.projects__project__title {
  display: flex;
  align-items: flex-end;
  height: $projectsHeaderHeight;
  padding: $projectsHeaderPadding;

  h2 {
    font-size: $projectsTitleSize;
    margin: 0;
    padding: $projectsTitlePadding;
  }
}

.projects__project__infos {
  padding: 16px;

  .projects__project__desc {
    color: $projectsInfosColor;
    text-align: justify;
  }
}

.card__footer {
  button {
    font-size: $projectsButtonTextSize;

    i {
      color: $projectsButtonIconColor;
    }

    span {
      color: $projectsButtonTextColor;
    }
  }
}

@mixin span-columns($n) {
  $colNumber: 12 / $n;
  $equalPercent: 100 / $colNumber;
  $marginReducer: (($colNumber - 1) / $colNumber) * $projectsMargin;
  $cardSize: calc(#{$equalPercent + 0%} - #{$marginReducer});

  margin-right: $projectsMargin;
  width: $cardSize;
}

@mixin omega($expr) {
  display: inline-block;
  vertical-align: top;

  &:nth-child(#{$expr}) {
    margin-right: 0;
  }
}

@include minMedia(0, $sm) {
  .projects .projects__project {
    @include span-columns(12);
    @include omega(1n);
  }
}

@include minMedia($sm, $md) {
  .projects .projects__project {
    @include span-columns(6);
    @include omega(2n);
  }
}

@include minMedia($md, $lg) {
  .projects .projects__project {
    @include span-columns(4);
    @include omega(3n);
  }
}

@include minMediaWithoutMax($lg) {
  .projects .projects__project {
    @include span-columns(3);
    @include omega(4n);
  }
}

</style>

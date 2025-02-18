<template>
  <header class="header">
    <img src="./assets/logo.png" />
    <h1 class="header-title">Typicals search</h1>
    <p class="header-subtitle">Very good for finding typicals?</p>
  </header>
  <div class="container">
    <ais-instant-search :search-client="searchClient" index-name="typicals">
      <div class="search-panel__filters">
        <!-- <ais-sort-by
          :items="[
            {
              value: 'series:desc',
              label: 'Descendo',
            },
            {
              value: 'series:asc',
              label: 'Subindo',
            },
          ]"
        /> -->
        <h2>Industry</h2>
        <ais-refinement-list attribute="industry" />
        <h2>Application</h2>
        <ais-refinement-list attribute="application" show-more="true" show-more-limit="500" />
      </div>
      <div class="search-panel__results">
        <app-debounced-search-box :delay="10" class="ais-SearchBox-input" />
        <ais-hits>
          <template v-slot:item="{ item }">
            <div @click="itemClicked(item)">
              <div class="hit-name">
                <ais-highlight :hit="item" attribute="code" />
              </div>
              <img :src="item.referenceImage" align="left" :alt="item.referenceImage" />
              <div class="hit-description">
                <ais-snippet :hit="item" attribute="mainProductLine" />
              </div>
              <div class="hit-info">sec. product line: {{ item.secondaryProductLine }}</div>
            </div>
          </template>
        </ais-hits>
        <ais-configure
          :attributesToSnippet="['name:50']"
          snippetEllipsisText="…"
        />
      </div>
      <ais-pagination />
    </ais-instant-search>
  </div>
</template>

<script>
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import AppDebouncedSearchBox from "./DebouncedSearchBox";

export default {
  components: {
    AppDebouncedSearchBox,
  },
  methods: {
    itemClicked(typical) {
      console.log(typical);
      let cmfavUrl = typical?.cmInfo?.cmfav ?? ''
      console.log("Item clicked: " + cmfavUrl);
      const cetCall = 'cet://typicals.custom.global/';
      console.log(cetCall + cmfavUrl);
      window.chrome.webview.postMessage(cetCall + cmfavUrl);
    },
  },
  data() {
    return {
      searchClient: instantMeiliSearch(
        process.env.VUE_APP_MEILISEARCH_HOST,
        process.env.VUE_APP_MEILISEARCH_API_KEY,
        {
          finitePagination: true,
        }
      ).searchClient,
    };
  }
};



</script>
<style>
body,
h1 {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.ais-Hits-item {
  margin-bottom: 1em;
  width: calc(50% - 1rem);
}

.ais-Hits-item img {
  margin-right: 1em;
  width: 100%;
  height: 100%;
  margin-bottom: 0.5em;
}

.ais-Highlight-highlighted {
  background: cyan;
  font-style: normal;
}

.disclaimer {
  margin-left: 1em;
}

.hit-name {
  margin-bottom: 0.5em;
}

.hit-info {
  font-size: 90%;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #fff, #33a7d9);
  color: #333;
  margin-bottom: 1rem;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.hit-description {
  font-size: 90%;
  margin-bottom: 0.5em;
  color: grey;
}

.header-title::after {
  content: " ▸ ";
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  padding: 1rem;
}

.ais-InstantSearch {
  max-width: 960px;
  overflow: hidden;
  margin: 0;
}

.search-panel__filters {
  float: left;
  width: 200px;
}

.search-panel__results {
  margin-left: 210px;
}

.ais-SearchBox {
  margin-bottom: 2rem;
}

.ais-Pagination {
  margin: 2rem auto;
  text-align: center;
}
.ais-SearchBox-form {
  margin-bottom: 20px;
}
</style>

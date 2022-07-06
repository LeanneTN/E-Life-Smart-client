<template>
<div class="search">
  <section>
    <b-field>
      <b-autocomplete
        rounded
        v-model="name"
        :data="filteredDataArray"
        placeholder="搜索帖子"
        icon="magnify"
        size="is-small"
        class="search-input"
        clearable
        @select="option => selected = option">
        <template #empty>No results found</template>
      </b-autocomplete>
      <el-button class="search-btn" type="primary" icon="el-icon-search" size="small">搜索</el-button>
    </b-field>

  </section>

</div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      data: [
        'Angular',
        'Angular 2',
        'Aurelia',
        'Backbone',
        'Ember',
        'jQuery',
        'Meteor',
        'Node.js',
        'Polymer',
        'React',
        'RxJS',
        'Vue.js'
      ],
      name: '',
      selected: null
    }
  },
  computed: {
    filteredDataArray() {
      return this.data.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style scoped lang='less'>
  .search {
    border-radius: 4px;
    background: #f5f5f5;
    padding: 2%;
    .search-input{
      width: 210px;
    }
    .search-btn {
      margin-left: 10px;
      height: 30px
    }
  }
</style>
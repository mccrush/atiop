<template>
  <div>
    <div class="row ps-md-0 pe-md-0 pb-md-0">
      <div class="col-10 col-md-10 pe-0">
        <input
          type="text"
          class="form-control"
          name="itemTitle"
          v-model.trim="item.title"
          @change="saveItem"
        />
      </div>
      <div class="col-2 col-md-2">
        <div class="d-flex justify-content-end pt-1">
          <BtnTrash
            class="w-100"
            @click="removeItem(item)"
            :data-bs-dismiss="mainView === 'kanban' ? 'offcanvas' : ''"
          />
        </div>
      </div>
    </div>

    <div class="mt-3">
      <Editor
        :api-key="apiKey"
        :initialValue="item.description"
        :init="conf"
        v-model="item.description"
        @change="saveItem"
      />
    </div>

    <div class="row pb-5">
      <div class="col-4 pe-0">
        <input
          type="number"
          class="form-control form-control-sm mt-2"
          name="itemPosition"
          v-model.number="item.position"
          @change="saveItem"
        />
      </div>
      <div v-if="appMode === 'tasks'" class="col-4 ps-md-2 pe-md-0">
        <input
          v-if="item.type === 'task'"
          type="number"
          class="form-control form-control-sm mt-2"
          name="itemPrice"
          min="0"
          step="10"
          v-model.number="item.price"
          @change="saveItem"
        />
      </div>
      <div v-if="appMode === 'tasks'" class="col-4 ps-md-2">
        <input
          v-if="item.type === 'task'"
          type="number"
          class="form-control form-control-sm mt-2"
          name="itemMinutes"
          min="0"
          step="5"
          v-model.number="item.minutes"
          @change="saveItem"
        />
      </div>

      <div
        v-if="appMode === 'tasks' && item.type === 'task'"
        class="col-12 col-md-4 d-flex align-items-center pe-md-0"
      >
        <select
          class="form-select form-select-sm mt-2"
          aria-label="Статус"
          v-model="item.status"
          @change="saveItem"
        >
          <option v-for="status in statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

      <div v-if="appMode === 'tasks'" class="col-12 col-md-4 pe-md-0">
        <input
          type="datetime-local"
          class="form-control form-control-sm mt-2"
          name="itemDateremind"
          v-model="item.dateReminde"
          @change="saveItem"
        />
      </div>

      <div
        v-if="item.type === 'task' || item.type === 'project'"
        class="col-12 col-md-4 d-flex align-items-center"
      >
        <select
          class="form-select form-select-sm mt-2"
          aria-label="Выбор блокнота"
          v-model="item.parentId"
          @change="saveItem"
        >
          <option
            v-for="parentItem in parentItems"
            :key="parentItem.id"
            :value="parentItem.id"
          >
            {{ parentItem.title }}
          </option>
        </select>
      </div>

      <div
        v-if="appMode === 'notes' && item.type === 'task'"
        class="col-12 col-md-8 mt-2"
      >
        <div class="d-flex p-1">
          <div class="dropdown">
            <button
              class="btn btn-sm btn-dark me-2 ps-2 pe-2"
              data-bs-toggle="dropdown"
            >
              +
            </button>
            <FormAddTag class="dropdown-menu" @toggle-tag="toggleTag" />
          </div>

          <div class="d-flex align-items-center">
            <button
              v-for="tag in item.tags"
              :key="tag.id"
              class="btn btn-sm btn-dark me-2 ps-2 pe-2"
              @click="setTagFilter(tag)"
            >
              {{ tag.title }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row mt-2 ps-md-0 pe-2 pe-md-0">
      
      
    </div> -->
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import BtnTrash from './../buttons/BtnTrash.vue'
import FormAddTag from './FormAddTag.vue'

export default {
  components: {
    Editor,
    BtnTrash,
    FormAddTag
  },
  props: {
    item: Object
  },
  data() {
    return {
      apiKey: 'hanxollva4phpflvvnv1lje4y82fvprrkqrmpqeclw066js2',
      conf: {
        menubar: false,
        plugins: 'lists link table code wordcount',
        toolbar:
          'bold forecolor link numlist bullist alignleft aligncenter table code removeformat',
        height: '70vh',
        skin: 'oxide-dark',
        content_css: 'dark'
      },
      statuses: ['active', 'done', 'archive']
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    appMode() {
      return this.$store.getters.appMode
    },
    mainView() {
      return this.$store.getters.mainView
    },
    parentItems() {
      if (this.item.type === 'task') {
        return this.$store.getters.project
      } else if (this.item.type === 'project') {
        return this.$store.getters.direction
      }
    }
  },
  methods: {
    setTagFilter(tag) {
      this.$store.commit('setTag', tag)
    },
    toggleTag(tag) {
      if (!this.item.tags) {
        this.item.tags = []
      }
      if (this.item.tags.find(item => item.id === tag.id)) {
        this.item.tags = this.item.tags.filter(item => item.id !== tag.id)
      } else {
        this.item.tags.push(tag)
      }
      this.saveItem()
    },
    saveItem() {
      this.$store.dispatch('updateItemRT', {
        item: this.item,
        currentUserId: this.currentUserId,
        appMode: this.appMode
      })
    },

    removeOneItem(item) {
      this.$store.dispatch('removeItemRT', {
        item,
        currentUserId: this.currentUserId,
        appMode: this.appMode
      })

      this.$store.commit('setItem', { type: this.item.type, item: null })
      this.$store.commit('setItemId', { type: this.item.type, id: '' })
    },

    removeItem(item) {
      if (item.type === 'direction') {
        if (confirm('Будут удалены все дочерние Проекты и элементы')) {
          const childrenTasks = this.$store.getters.project.filter(
            el => el.parentId === item.id
          )
          childrenTasks.forEach(el => {
            this.removeItem(el)
          })
          this.removeOneItem(item)
        }
      } else if (item.type === 'project') {
        if (confirm('Будут удалены все дочерние эелементы')) {
          const childrenTasks = this.$store.getters.task.filter(
            el => el.parentId === item.id
          )
          childrenTasks.forEach(el => {
            this.removeItem(el)
          })
          this.removeOneItem(item)
        }
      } else {
        if (confirm('Точно удалить?')) {
          this.removeOneItem(item)
        }
      }
    }
  }
}
</script>
<template>
  <div class="card-box">
    <div class="meal-plan-card">

      <div class="meal-plan-card-heading">
        <div class="top-left">
          <img src="../../delete-xxl.png" alt="Delete Icon" class="delete-btn"
          v-show="mealPlanEditToggle == true" v-on:click="deleteMealPlan(); mealPlanEditToggle = false;">
        </div>
        <router-link
          v-bind:to="{
            name: 'meal-plan-details',
            params: { id: mealPlan.mealPlanId },
          }"
          class="meal-plan-name"
        >
          <h2 v-show="mealPlanEditToggle == false">
            {{ mealPlan.name }}   </h2>
             <p class="meal-plan-description" v-show="mealPlanEditToggle == false">
          {{ mealPlan.description }}
        </p>
       
        </router-link>
      <div class="edit-container">
        <b-input
        size="sm"
        class="meal-plan-name-input"
        v-bind:value="mealPlan.name"
        v-bind:placeholder="'Meal Plan Name'"
        v-show="mealPlanEditToggle == true"
        v-model="enteredMealPlanName"
        maxlength="24"
        />
        

     

        <b-input
        size="sm"
        class="meal-plan-desc-input"
        v-bind:value="mealPlan.description"
        v-bind:placeholder="'Meal Plan Description'"
        v-show="mealPlanEditToggle == true"
        v-model="enteredDescription"
        maxlength="32"
        />
        </div>
        <div class="bottom-right">
          <img
            class="edit-btn"
            v-show="mealPlanEditToggle == false"
            v-on:click="mealPlanEditToggle = true"
            src="../../Edit_Icon.png"
            alt="Edit button"
          />
          </div>
          <div class="bottom-right">
          <img
            class="save-btn"
            v-show="mealPlanEditToggle == true"
            v-on:click="updateMealPlanName()"
            src="../../Save_Icon.png"
            alt="Save button"
          />
          </div>
        
        </div>

        <!-- <b-input
          size="sm"
          class="meal-plan-name-input"
          v-bind:value="mealPlan.name"
          v-show="mealPlanEditToggle == true"
        />
       
        <b-input
          size="sm"
          class="meal-plan-desc-input"
          v-bind:value="mealPlan.description"
          v-show="mealPlanEditToggle == true"
        /> -->
    </div>
  </div>
</template>

<script>
import AccountService from '../services/AccountService.js';

export default {
  name: "meal-plan-card",
  props: {
    mealPlan: Object,
    enableAdd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mealPlanEditToggle: false,
      enteredMealPlanName: '',
      enteredDescription: '',
      mealPlanId: 0,
      renderComponent: true
    };
  },
  methods: {
    setMealPlan() {
      this.mealPlanId = this.mealPlan.mealPlanId;
    },
    async forceRerender() {
      this.renderComponent = false;
      await this.$nextTick();
      this.renderComponent = true;
    },
    updateMealPlanName() {
      AccountService.updateMealPlan(this.formatMealPlan()).then((response) => {
        if (response.status == 200) {
          AccountService.getAllMealPlans().then((response) => {
            if (response.status == 200) {
              this.$store.commit("SET_MEAL_PLANS", response.data);
              this.enteredDescription = "";
              this.enteredMealPlanName = "";
            }
          });
        }
      });
      this.mealPlanEditToggle = false;
    },
    deleteMealPlan() {
      AccountService.deleteMealPlan(this.mealPlan.mealPlanId).then((response) => {
        if (response.status != 200) {
          this.$store.commit("REMOVE_MEAL_PLAN", this.mealPlan);
          location.reload();
        }
      })
    },
    checkForEmptyName() {
      if (this.enteredMealPlanName == "" || this.enteredMealPlanName == " ") {
        return this.mealPlan.name;
      } else {
        return this.enteredMealPlanName;
      }
    },
    checkForEmptyDesc() {
      if (this.enteredDescription == "" || this.enteredDescription == " ") {
        return this.mealPlan.description;
      } else {
        return this.enteredDescription;
      }
    },
    formatMealPlan() {
      const formattedMealPlan = {
        mealPlanId: this.mealPlan.mealPlanId,
        name: this.checkForEmptyName(),
        description: this.checkForEmptyDesc(),
      };
      return formattedMealPlan;
    }
  },
};
</script>

<style scoped>
.meal-plan-card {
  border: 2px solid black;
  background-image: url("https://images.squarespace-cdn.com/content/v1/5960f8d115d5db554bc42928/1547070313750-245D1CXNTKYZ3A2HF2E3/Meal_Plans_Banner3.jpg?format=2500w");
  background-position: cover;
  background-size: 37.5rem;
  border-radius: 10px;
  width: 22rem;
  height: 16rem;
  margin-top: 0rem;
  text-align: center;
  margin-bottom: 3rem;
}

.meal-plan-card:hover {
  border: 3px solid #e1b0f0;
}

.meal-plan-name-input {
  text-align: center;
  width: 70%;
  margin-top: -5px;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.85rem;
}

.meal-plan-desc-input {
  text-align: center;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -5px;
  font-size: 0.6rem;
}

.edit-btn, .delete-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 1rem;
  height: 1rem;
  font-size: 10px;
  text-align: center;
  border-radius: 20%;
  background-color: transparent;
  color: #0a3d5d;
}

.save-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 10px;
  text-align: center;
  border-radius: 20%;
  background-color: transparent;
  color: #0a3d5d;
}

.edit-btn:hover {
  width: 1.2rem;
  height: 1.2rem;
}

.save-btn:hover {
  width: 1.4rem;
  height: 1.4rem;
}
.delete-btn:hover {
  width: 1.2rem;
  height: 1.2rem;
}


.bottom-right {
  position: relative;
 top: -1.75rem;
  left: 8rem;
}


.top-left {
  position: relative;
  top: .4rem;
  right: 9rem;  
}

.meal-plan-card-heading {
  border: .5px solid #8AB1C9;
  border-radius: 5px;
  background-color:  #F8F9FA;
  opacity: .95;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.meal-plan-name > h2 {
  color: black;
  font-size: 1.5rem;
  margin-top: 3.75rem;
}

a {
  text-decoration: none;
  color: black;
}

.meal-plan-description {
  font-size: 1rem;
  margin-bottom: 2.75rem;
}

.meal-plan-name-input {
  height: 2rem;
  font-size: 1.25rem;
  margin-top: 2.25rem;
  margin-bottom: .5rem;
}

.meal-plan-desc-input {
  font-size: 1rem;
  margin-bottom:4.7rem;
  
}

.edit-container {
  margin-top: 20px;
}


</style>
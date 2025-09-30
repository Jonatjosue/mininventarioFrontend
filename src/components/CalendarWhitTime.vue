<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <button @click="previousMonth" class="btn btn-outline">‹</button>
      <h2 class="text-xl font-bold">
        {{ currentMonthYear }}
      </h2>
      <button @click="nextMonth" class="btn btn-outline">›</button>
    </div>

    <div class="grid grid-cols-7 gap-2 mb-4">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="text-center font-semibold py-2"
      >
        {{ day }}
      </div>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="border rounded-lg p-2 min-h-24 cursor-pointer hover:bg-base-200 transition-colors"
        :class="{
          'bg-base-300': !day.isCurrentMonth,
          'bg-primary text-primary-content': day.isToday,
          'border-primary': isSelectedDate(day.date),
        }"
        @click="selectDate(day.date)"
      >
        <div class="flex justify-between items-start">
          <span class="text-sm font-medium">{{ day.day }}</span>
          <span v-if="day.isToday" class="badge badge-primary badge-xs"
            >Hoy</span
          >
        </div>

        <div v-if="selectedTimes[day.date]" class="mt-2 space-y-1">
          <div
            v-for="time in selectedTimes[day.date]"
            :key="time"
            class="badge badge-success badge-sm"
          >
            {{ time }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedDate" class="mt-8">
      <h3 class="text-lg font-semibold mb-4">
        Horas para {{ formatSelectedDate }}
      </h3>

      <div class="grid grid-cols-4 md:grid-cols-6 gap-2">
        <button
          v-for="time in timeSlots"
          :key="time"
          class="btn btn-outline btn-sm"
          :class="{
            'btn-primary': isTimeSelected(time),
            'btn-outline': !isTimeSelected(time),
          }"
          @click="toggleTime(time)"
        >
          {{ time }}
        </button>
      </div>

      <div v-if="getSelectedTimesForDate().length > 0" class="mt-4">
        <h4 class="font-semibold mb-2">Horas seleccionadas:</h4>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="time in getSelectedTimesForDate()"
            :key="time"
            class="badge badge-primary gap-2"
          >
            {{ time }}
            <button @click="removeTime(time)" class="btn btn-xs btn-circle">
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';


const currentDate = ref(new Date());
const selectedDate = ref(null);
const selectedTimes = ref({});

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const timeSlots = computed(() => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }
  return slots;
});

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric',
  });
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];

  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  const today = new Date().toISOString().split('T')[0];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    const dateString = date.toISOString().split('T')[0];
    days.push({
      date: dateString,
      day: i,
      isCurrentMonth: true,
      isToday: dateString === today,
    });
  }

  const totalCells = 42;
  const remainingCells = totalCells - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      date: date.toISOString().split('T')[0],
      day: i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  return days;
});

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return '';
  const date = new Date(selectedDate.value);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const selectDate = (date) => {
  selectedDate.value = date;
  if (!selectedTimes.value[date]) {
    selectedTimes.value[date] = [];
  }
};

const isSelectedDate = (date) => {
  return selectedDate.value === date;
};

const isTimeSelected = (time) => {
  if (!selectedDate.value) return false;
  return selectedTimes.value[selectedDate.value]?.includes(time);
};

const toggleTime = (time) => {
  if (!selectedDate.value) return;

  const dateTimes = selectedTimes.value[selectedDate.value] || [];
  const index = dateTimes.indexOf(time);

  if (index > -1) {
    dateTimes.splice(index, 1);
  } else {
    dateTimes.push(time);
  }

  selectedTimes.value[selectedDate.value] = dateTimes.sort();
};

const removeTime = (time) => {
  if (!selectedDate.value) return;

  const dateTimes = selectedTimes.value[selectedDate.value];
  const index = dateTimes.indexOf(time);

  if (index > -1) {
    dateTimes.splice(index, 1);
  }
};

const getSelectedTimesForDate = () => {
  if (!selectedDate.value) return [];
  return selectedTimes.value[selectedDate.value] || [];
};

onMounted(() => {
  const today = new Date().toISOString().split('T')[0];
  selectDate(today);
});
</script>

<style scoped>
.min-h-24 {
  min-height: 6rem;
}
</style>

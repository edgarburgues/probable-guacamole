<template>
    <div class='app'>
        <FullCalendar :options='calendarOptions' />
    </div>
</template>
  
<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
export default {
    components: {
        FullCalendar
    },
    data() {
        return {
            calendarOptions: {
                plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
                initialView: 'dayGridMonth',
                nowIndicator: true,
                editable: true,
                initialEvents: [
                    { title: 'nice event', start: new Date() }
                ]
            }
        }
    }
}
</script>
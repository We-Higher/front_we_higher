import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';

function Schedule() {
    const myPort = process.env.REACT_APP_MY_PORT
    const token = sessionStorage.getItem("token");
    const [events, setEvents] = useState([])

    const loadEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:${myPort}/auth/schedule`, {
                headers: { Authorization: token },
            });
            setEvents(response.data); // 일정 상태를 업데이트
        } catch (error) {
            console.error('Error loading events', error);
        }
    };

    // 컴포넌트가 마운트될 때 일정 데이터를 불러옴
    useEffect(() => {
        loadEvents();
    }, []);

    console.log('events', events);

    //일정 추가
    const handleDateSelect = async (selectInfo) => {
        let title = prompt('일정을 입력해주세요.');
        if (title) {
            const eventData = [{
                title: title,
                start: selectInfo.start.setHours(selectInfo.start.getHours()),
                end: selectInfo.end.setHours(selectInfo.end.getHours()),
            }];

            try {
                const response = await axios.post(`http://localhost:${myPort}/auth/schedule`, eventData, { headers: { Authorization: token } });

                if (response.status === 200) {

                    setEvents([...events, response.data.newEvent]);
                }
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
    };

    //일정 삭제
    const handleEventClick = async (info) => {
        console.log(info);
        if (window.confirm(`${info.event.title} 일정을 삭제하시겠습니까?`)) {
            const calId = info.event._def.extendedProps.cal_Id;
            if (calId === '') {
                calId = info.event._def.publicId
            }
            try {
                const response = await axios.delete(`http://localhost:${myPort}/auth/schedule/${calId}`, { headers: { Authorization: token } });

                if (response.data.flag) {
                    info.event.remove();
                    setEvents(events.filter(event => event.cal_Id !== Number(calId)));
                    console.log('Schedule removed successfully');
                } else {
                    alert(response.data.msg);
                }
            } catch (error) {
                console.error('Error deleting schedule', error);
            }
        }
    };

    //수정(Drop)
    const handleEventDrop = async (info) => {
        if (window.confirm(`${info.event.title} 일정을 수정하시겠습니까?`)) {
            const events = [{
                title: info.event._def.title,
                start: info.event.start.getTime(),
                end: info.event.end.getTime(),
            }];

            const calId = info.event.extendedProps.cal_Id;
            if (calId === '') {
                calId = info.event._def.publicId
            }
            try {
                const response = await axios({
                    method: 'put',
                    url: `http://localhost:${myPort}/auth/schedule/${calId}`,
                    headers: { Authorization: token, 'Content-Type': 'application/json' },
                    data: JSON.stringify(events)
                });

                if (response.data.flag) {
                    loadEvents();
                } else {
                    alert(response.data.msg);
                    info.revert();
                }
            } catch (error) {
                console.error('Error updating schedule', error);
                info.revert();
            }
        } else {
            info.revert();
        }
    };

    // 수정(시간 Resize)
    const handleEventResize = async (info) => {
        if (window.confirm(`${info.event.title} 일정을 수정하시겠습니까?`)) {
            const events = [{
                title: info.event._def.title,
                start: info.event.start.getTime(),
                end: info.event.end.getTime(),
            }];

            const calId = info.event.extendedProps.cal_Id;
            if (calId === '') {
                calId = info.event._def.publicId
            }
            try {
                const response = await axios({
                    method: 'put',
                    url: `http://localhost:${myPort}/auth/schedule/${calId}`,
                    headers: { Authorization: token, 'Content-Type': 'application/json' },
                    data: JSON.stringify(events)
                });

                if (response.data.flag) {
                    loadEvents();
                } else {
                    alert(response.data.msg);
                    info.revert();
                }
            } catch (error) {
                console.error('Error updating schedule', error);
                info.revert();
            }
        } else {
            info.revert();
        }
    };
    
    return (
        <div style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                editable={true}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
                events={events}
            />
        </div>
    );
}

export default Schedule;
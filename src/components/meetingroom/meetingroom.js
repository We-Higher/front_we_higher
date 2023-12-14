import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import '../../css/meetingroom.css';

const RoomTab = ({ id, active, onTabClick }) => (
  <li id={`mtab${id}`} className={`mtab ${active ? 'active' : ''}`}>
    <a className="room-link" onClick={() => onTabClick(id)}>
      {id === '0' ? '전체보기' : `회의실${id}`}
    </a>
  </li>
);

const MeetingRoomTabs = ({ activeId, onTabClick }) => (
  <div className="tabbable-panel">
    <div className="tabbable-line">
      <ul className="nav nav-tabs ">
        {['0', '1', '2', '3', '4', '5', '6'].map(id => (
          <RoomTab key={id} id={id} active={id === activeId} onTabClick={onTabClick} />
        ))}
      </ul>
    </div>
  </div>
);

function Meetingroom() {
  const myPort = process.env.REACT_APP_MY_PORT;
  const token = sessionStorage.getItem('token');
  const [roomId, setRoomId] = useState('0');
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      let response;
      if (roomId === '0') {
        response = await axios.get(`http://localhost:${myPort}/auth/meetingroom`, {
          headers: { Authorization: token },
        });
      } else {
        response = await axios.get(`http://localhost:${myPort}/auth/meetingroom/${roomId}`, {
          headers: { Authorization: token },
        });
      }
      setEvents(response.data);
    } catch (error) {
      console.error('Error loading events', error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [roomId]);

  const showRoomId = async (roomId) => {
    try {
      setRoomId(roomId);
    } catch (error) {
      console.error('Error loading events by roomId', error);
    }
  };

    const [forceRerender, setForceRerender] = useState(false);
    
    //추가  
    const handleDateSelect = async (arg) => {
        if (roomId === '0') {
            alert('본 방은 읽기 전용입니다.');
            window.location.reload();
        } else {
            const title = window.prompt('회의 일정을 입력해주세요.');
            if (title) {
                const event = {
                    title,
                    start: arg.start.getTime(),
                    end: arg.end.getTime(),
                    roomId,
                };

                const overlapping = events.some((calEvent) =>
                    (calEvent.start < event.end && calEvent.end > event.start) &&
                    (calEvent.extendedProps.roomId === event.roomId)
                );

                if (overlapping) {
                    alert('이미 이벤트가 있는 시간에는 중복을 할 수 없습니다.');
                } else {
                    try {
                        const response = await axios.post(`http://localhost:${myPort}/auth/meetingroom/${roomId}`, [event], {
                            headers: { Authorization: token },
                        });

                        setEvents(prevEvents => [...prevEvents, {
                            id: response.data.cal_Id,
                            title: response.data.title,
                            start: response.data.start,
                            end: response.data.end,
                            extendedProps: {
                                roomId: response.data.roomId,
                            },
                        }]);
                        setForceRerender(prevValue => !prevValue);
                    } catch (error) {
                        console.error('이벤트 저장 오류', error);
                    }
                }
            }
        }
    };

    //drop으로 수정
    const handleEventDrop = async (info) => {
        if (roomId === '0') {
            alert('본 방은 읽기 전용입니다.');
            window.location.reload();
        } else {
            if (window.confirm(`${info.event.title} 일정을 수정하시겠습니까 ?`)) {
                const events = [{
                    title: info.event.title,
                    start: info.event.start.getTime(),
                    end: info.event.end.getTime(),
                    roomId: info.event.extendedProps.roomId,
                }];

                try {
                    const calId = info.event.id;
                    const response = await axios.put(`http://localhost:${myPort}/auth/meetingroom/${calId}/${roomId}`, events, {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.data.flag) {
                        info.revert();
                    } else {
                        alert(response.data.msg);
                    }
                } catch (error) {
                    console.error('Error updating event', error);
                }

                loadEvents();
            }
        }
    };


    //Resize수정 
    const handleEventResize = async (info) => {
        if (roomId === '0') {
            alert('본 방은 읽기 전용입니다.');
            window.location.reload();
        } else {
            if (window.confirm(`${info.event.title} 일정을 수정하시겠습니까 ?`)) {
                const events = [{
                    title: info.event.title,
                    start: info.event.start.getTime(),
                    end: info.event.end.getTime(),
                    roomId: info.event.extendedProps.roomId,
                }];

                try {
                    const calId = info.event.id;
                    const response = await axios.put(`http://localhost:${myPort}/auth/meetingroom/${calId}/${roomId}`, events, {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.data.flag) {
                        info.revert();
                    } else {
                        alert(response.data.msg);
                    }
                } catch (error) {
                    console.error('Error updating event', error);
                }

                loadEvents();
            }
        }
    };

    //삭제
    const handleEventClick = async (info) => {
        if (roomId === '0') {
            alert('본 방은 읽기 전용입니다.');
            info.jsEvent.preventDefault();
        } else {
            if (window.confirm(`${info.event.title} 일정을 삭제하시겠습니까 ?`)) {
                try {
                    const calId = info.event.id;
                    const response = await axios.delete(`http://localhost:${myPort}/auth/meetingroom/${calId}`, {
                        headers: {
                            Authorization: token,
                        },
                    });

                    if (response.data.flag) {
                        info.event.remove();
                    } else {
                        alert(response.data.msg);
                    }
                } catch (error) {
                    console.error('Error deleting event', error);
                }
            }
        }
    };


    return (
        <div style={{ marginTop: '20px', width: '80%', margin: 'auto' }}>
          <div layout="fragment" content>
            <MeetingRoomTabs activeId={roomId} onTabClick={showRoomId} />
            <div id="wrap">
              <div style={{ marginTop: '20px' }}>
                <FullCalendar
                  key={forceRerender}
                  plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay,listWeek',
                  }}
                  editable={true}
                  selectable={true}
                  events={events.map((event) => ({
                    id: event.cal_Id,
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    className: `room-${event.roomId}`,
                    extendedProps: {
                      roomId: event.roomId,
                    },
                  }))}
                  select={handleDateSelect}
                  eventClick={handleEventClick}
                  eventDrop={handleEventDrop}
                  eventResize={handleEventResize}
                />
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
        </div>
      );
    }
    
    export default Meetingroom;
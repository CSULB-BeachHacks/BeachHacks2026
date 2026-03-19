import React from "react";
import "./Timeline.css";

const day1Events = [
    { time: "10:00 AM - 11:00 AM", title: "Hackers Arrive & Check-In", description: "Arrive at the Pointe and check in" },
    { time: "11:00 AM", title: "Opening Ceremony" },
    { time: "11:30 AM", title: "Team Formation" },
    { time: "12:00 PM", title: "Hackathon Officially Begins" },
    { time: "12:00 PM - 1:00 PM", title: "Fetch.ai Workshop" },
    { time: "1:00 PM", title: "Lunch", description: "PizzaMania" },
    { time: "1:30 PM - 2:30 PM", title: "Code & Coffee Workshop" },
    { time: "2:30 PM - 3:30 PM", title: "IEEE Workshop" },
    { time: "3:30 PM - 4:30 PM", title: "AI Club Workshop", description: "TENTATIVE" },
    { time: "7:00 PM", title: "Dinner", description: "Cha for Tea" },
    { time: "10:30 PM", title: "Hackers Begin to Pack Up" },
    { time: "10:50 PM", title: "Hackers Leave for the Night" },
];

const day2Events = [
    { time: "8:30 AM - 10:30 AM", title: "Hackers Arrive & Check-In" },
    { time: "11:00 AM", title: "Breakfast", description: "Donuts" },
    { time: "11:30 AM", title: "Project Submissions Due" },
    { time: "11:45 AM", title: "Last Devpost Edit" },
    { time: "12:00 PM", title: "Judging Begins" },
    { time: "2:30 PM", title: "Judging Concludes" },
    { time: "3:00 PM", title: "Lunch", description: "Subway" },
    { time: "3:30 PM", title: "Closing Ceremony" },
    { time: "4:30 PM", title: "Hackathon Officially Over" },
];
const TimelineDay = ({ title, events }) => (
    <div className="timeline-day">
        <h4 className="timeline-day-title">{title}</h4>
        <div className="timeline">
            {events.map((event, index) => (
                <div className="timeline-item" key={index}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                        <span className="timeline-time">{event.time}</span>
                        <h5 className="timeline-event-title">{event.title}</h5>
                        {event.description && (
                            <p className="timeline-description">{event.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Timeline = () => {
    return (
        <div className="timeline-container">
            <h3 className="timeline-title">Run of Show</h3>
            <div className="timeline-grid">
                <TimelineDay title="March 21, 2026 — Day 1" events={day1Events} />
                <TimelineDay title="March 22, 2026 — Day 2" events={day2Events} />
            </div>
        </div>
    );
};

export default Timeline;
import { Rink } from './types'

export const defaultRinks: Rink[] = [
  {
    id: 'marquarie-ice-rink',
    name: 'Macquarie Ice Rink',
    address: 'Corner of Herring Road and Waterloo Rd, North Ryde NSW 2113, Floor 0, Macquarie Centre',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13241.5501151359!2d150.85815394790743!3d-33.9311596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a60cc159269b%3A0xa745ba1d6b763429!2sMacquarie%20Ice%20Rink!5e0!3m2!1sen!2sau!4v1771034702665!5m2!1sen!2sau',
    schedule: [
      {
        date: '2026-02-16',
        sessions: [
          { start: '09:00', end: '11:00', type: 'Public Session', notes: 'Public Session 9am - 11am' },
          { start: '11:30', end: '13:00', type: 'Flat Rate Session', notes: 'Flat Rate Session 11:30am - 1pm' },
          { start: '15:00', end: '17:00', type: 'Public Session', notes: 'Public Session 3pm - 5pm' },
          { start: '18:00', end: '19:30', type: 'Flat Rate Session', notes: 'Flat Rate Session 6pm - 7:30pm' },
          { start: '20:00', end: '21:30', type: 'Learn to Skate', notes: 'Learn to Skate 8pm - 9:30pm' },
        ],
      },
      {
        date: '2026-02-17',
        sessions: [
          { start: '09:00', end: '11:00', type: 'Public Session', notes: 'Public Session 9am - 11am' },
          { start: '10:00', end: '11:00', type: 'Family Club', notes: 'Family Club 10am - 11am' },
          { start: '11:30', end: '13:00', type: 'Flat Rate Session', notes: 'Flat Rate Session 11:30am - 1pm' },
          { start: '15:00', end: '17:00', type: 'Public Session', notes: 'Public Session 3pm - 5pm' },
        ],
      },
      {
        date: '2026-02-18',
        sessions: [
          { start: '06:30', end: '08:30', type: 'Stick & Puck', notes: 'Stick & Puck 6:30am - 8:30am' },
          { start: '09:00', end: '11:00', type: 'Public Session', notes: 'Public Session 9am - 11am' },
          { start: '11:30', end: '13:00', type: 'Flat Rate Session', notes: 'Flat Rate Session 11:30am - 1pm' },
          { start: '15:00', end: '17:00', type: 'Public Session', notes: 'Public Session 3pm - 5pm' },
          { start: '18:00', end: '19:30', type: 'Flat Rate Session', notes: 'Flat Rate Session 6pm - 7:30pm' },
        ],
      },
      {
        date: '2026-02-19',
        sessions: [
          { start: '09:00', end: '11:00', type: 'Public Session', notes: 'Public Session 9am - 11am' },
          { start: '10:00', end: '11:00', type: 'Family Club', notes: 'Family Club 10am - 11am' },
          { start: '11:30', end: '13:00', type: 'Flat Rate Session', notes: 'Flat Rate Session 11:30am - 1pm' },
          { start: '15:00', end: '16:30', type: 'Flat Rate Session', notes: 'Flat Rate Session 3pm - 4:30pm' },
          { start: '17:00', end: '19:00', type: 'Learn to Skate', notes: 'Learn to Skate 5pm - 7pm' },
          { start: '20:00', end: '22:00', type: 'Public Session', notes: 'Public Session 8pm - 10pm' },
        ],
      },
      {
        date: '2026-02-20',
        sessions: [
          { start: '06:30', end: '08:30', type: 'Stick & Puck', notes: 'Stick & Puck 6:30am - 8:30am' },
          { start: '09:00', end: '11:00', type: 'Public Session', notes: 'Public Session 9am - 11am' },
          { start: '11:30', end: '13:00', type: 'Flat Rate Session', notes: 'Flat Rate Session 11:30am - 1pm' },
          { start: '14:30', end: '16:30', type: 'Public Session', notes: 'Public Session 2:30pm - 4:30pm' },
          { start: '17:00', end: '18:30', type: 'Flat Rate Session', notes: 'Flat Rate Session 5pm - 6:30pm' },
          { start: '20:30', end: '22:30', type: 'Disco Session', notes: 'Disco Session 8:30pm - 10:30pm' },
        ],
      },
      {
        date: '2026-02-21',
        sessions: [
          { start: '08:30', end: '10:30', type: 'Learn to Skate', notes: 'Learn to Skate 8:30am - 10:30am' },
          { start: '11:30', end: '13:30', type: 'Public Session', notes: 'Public Session 11:30am - 1:30pm' },
          { start: '14:30', end: '16:30', type: 'Public Session', notes: 'Public Session 2:30pm - 4:30pm' },
          { start: '17:30', end: '19:30', type: 'Public Session', notes: 'Public Session 5:30pm - 7:30pm' },
          { start: '20:30', end: '22:30', type: 'Disco Session', notes: 'Disco Session 8:30pm - 10:30pm' },
        ],
      },
      {
        date: '2026-02-22',
        sessions: [
          { start: '11:45', end: '13:45', type: 'Public Session', notes: 'Public Session 11:45am - 1:45pm' },
          { start: '14:30', end: '16:30', type: 'Public Session', notes: 'Public Session 2:30pm - 4:30pm' },
          { start: '17:15', end: '19:15', type: 'Public Session', notes: 'Public Session 5:15pm - 7:15pm' },
        ],
      },
    ],
  },
  {
    id: 'lcc-ice-rink',
    name: 'LCC Ice Rink',
    address: '424/458 Hoxton Park Rd, Prestons NSW 2170',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13241.5501151359!2d150.8560750871582!3d-33.9311596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b1295dcae4e0aef%3A0xa253d5d240e6bc70!2sLCC%20Ice%20Rink!5e0!3m2!1sen!2sau!4v1771034713625!5m2!1sen!2sau',
    schedule: [
      {
        date: '2026-02-16',
        sessions: [
          { start: '09:30', end: null, type: 'Session', notes: '9:30am' },
          { start: '12:00', end: null, type: 'Session', notes: '12pm' },
        ],
      },
      {
        date: '2026-02-17',
        sessions: [
          { start: '09:30', end: null, type: 'Session', notes: '9:30am' },
          { start: '12:00', end: null, type: 'Session', notes: '12pm' },
        ],
      },
      {
        date: '2026-02-18',
        sessions: [
          { start: '09:30', end: null, type: 'Session', notes: '9:30am' },
          { start: '12:00', end: null, type: 'Session', notes: '12pm' },
          { start: '15:30', end: null, type: 'Session', notes: '3:30pm' },
        ],
      },
      {
        date: '2026-02-19',
        sessions: [
          { start: '09:30', end: null, type: 'Session', notes: '9:30am' },
          { start: '12:00', end: null, type: 'Session', notes: '12pm' },
        ],
      },
      {
        date: '2026-02-20',
        sessions: [
          { start: '09:30', end: null, type: 'Session', notes: '9:30am' },
          { start: '12:00', end: null, type: 'Session', notes: '12pm' },
          { start: '15:30', end: null, type: 'Session', notes: '3:30pm' },
        ],
      },
      {
        date: '2026-02-21',
        sessions: [{ start: '10:30', end: null, type: 'Session', notes: '10:30am' }],
      },
      {
        date: '2026-02-22',
        sessions: [{ start: '14:30', end: null, type: 'Session', notes: '2:30pm' }],
      },
    ],
  },
  {
    id: 'ice-zoo-sydney',
    name: 'Ice Zoo Sydney',
    address: 'Johnson St Cnr, Victoria Ln, Alexandria NSW',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11800.054542616064!2d151.18077313962027!3d-33.908235615495315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b05440928355%3A0x3a9f200f04041662!2sIce%20Zoo%20Sydney!5e0!3m2!1sen!2sau!4v1771034661604!5m2!1sen!2sau',
    schedule: [
      {
        date: '2026-02-14',
        sessions: [
          { start: '10:00', end: '11:30', type: 'General Public Skating', notes: 'Weekend session 10:00 - 11:30' },
          { start: '12:00', end: '13:30', type: 'General Public Skating', notes: 'Weekend session 12:00 - 13:30' },
          { start: '14:00', end: '15:30', type: 'General Public Skating', notes: 'Weekend session 14:00 - 15:30' },
          { start: '16:00', end: '17:30', type: 'General Public Skating', notes: 'Weekend session 16:00 - 17:30' },
          { start: '18:00', end: '19:30', type: 'General Public Skating', notes: 'Weekend session 18:00 - 19:30' },
        ],
      },
      {
        date: '2026-02-15',
        sessions: [
          { start: '10:00', end: '11:30', type: 'General Public Skating', notes: 'Weekend session 10:00 - 11:30' },
          { start: '12:00', end: '13:30', type: 'General Public Skating', notes: 'Weekend session 12:00 - 13:30' },
          { start: '14:00', end: '15:30', type: 'General Public Skating', notes: 'Weekend session 14:00 - 15:30' },
          { start: '16:00', end: '17:30', type: 'General Public Skating', notes: 'Weekend session 16:00 - 17:30' },
          { start: '18:00', end: '19:30', type: 'General Public Skating', notes: 'Weekend session 18:00 - 19:30' },
        ],
      },
      {
        date: '2026-02-16',
        sessions: [
          { start: '09:00', end: '10:45', type: 'General Public Skating', notes: 'Weekday session 9:00 - 10:45' },
          { start: '11:00', end: '12:45', type: 'General Public Skating', notes: 'Weekday session 11:00 - 12:45' },
          { start: '13:00', end: '14:45', type: 'General Public Skating', notes: 'Weekday session 13:00 - 14:45' },
          { start: '18:00', end: '19:30', type: 'General Public Skating', notes: 'Weekday session 18:00 - 19:30' },
        ],
      },
      {
        date: '2026-02-17',
        sessions: [
          { start: '09:00', end: '10:45', type: 'General Public Skating', notes: 'Weekday session 9:00 - 10:45' },
          { start: '11:00', end: '12:45', type: 'General Public Skating', notes: 'Weekday session 11:00 - 12:45' },
          { start: '13:00', end: '14:45', type: 'General Public Skating', notes: 'Weekday session 13:00 - 14:45' },
          { start: '18:00', end: '19:30', type: 'General Public Skating', notes: 'Weekday session 18:00 - 19:30' },
        ],
      },
      {
        date: '2026-02-18',
        sessions: [
          { start: '09:00', end: '10:45', type: 'General Public Skating', notes: 'Weekday session 9:00 - 10:45' },
          { start: '11:00', end: '12:45', type: 'General Public Skating', notes: 'Weekday session 11:00 - 12:45' },
          { start: '13:00', end: '14:45', type: 'General Public Skating', notes: 'Weekday session 13:00 - 14:45' },
          { start: '18:00', end: '19:30', type: 'General Public Skating', notes: 'Weekday session 18:00 - 19:30' },
        ],
      },
      {
        date: '2026-02-19',
        sessions: [
          { start: '09:00', end: '10:45', type: 'General Public Skating', notes: 'Weekday session 9:00 - 10:45' },
          { start: '11:00', end: '12:45', type: 'General Public Skating', notes: 'Weekday session 11:00 - 12:45' },
          { start: '13:00', end: '14:45', type: 'General Public Skating', notes: 'Weekday session 13:00 - 14:45' },
          { start: '18:00', end: '19:30', type: 'General Public Skating', notes: 'Weekday session 18:00 - 19:30' },
        ],
      },
      {
        date: '2026-02-20',
        sessions: [
          { start: '09:00', end: '10:45', type: 'General Public Skating', notes: 'Weekday session 9:00 - 10:45' },
          { start: '11:00', end: '12:45', type: 'General Public Skating', notes: 'Weekday session 11:00 - 12:45' },
          { start: '13:00', end: '14:45', type: 'General Public Skating', notes: 'Weekday session 13:00 - 14:45' },
          { start: '18:00', end: '19:30', type: 'General Public Skating', notes: 'Weekday session 18:00 - 19:30' },
        ],
      },
    ],
  },
]

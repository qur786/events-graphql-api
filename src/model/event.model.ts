export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export const events: Event[] = [
  {
    _id: "1",
    title: "Event 1",
    description: "lorem ipsum",
    date: "31-01-2024",
  },
];

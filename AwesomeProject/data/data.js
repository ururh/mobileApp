export const posts = [
  {
    id: 1,
    img: require('../assets/forest.png'),
    title: 'Ліс',
    location: 'Ukraine',
    comments: 8,
    likes: 153,
  },
  {
    id: 2,
    img: require('../assets/sunset.png'),
    title: 'Захід на Чорному морі',
    location: 'Ukraine',
    comments: 3,
    likes: 200,
  },
];

export const comments = {
  id: 1,
  postImage: require('../assets/sunset.png'),
  title: 'Sunset on the Black Sea',
  location: 'Ukraine',
  comments: 3,
  commentsTexts: [
    {
    id: 10,
    author:'user',
      date: '09 червня, 2020',
      time: '08:40',
      userAvatar: require('../assets/userTwo.png'),
      text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    },
    {
        id: 11,
        author:'userOne',
      userAvatar: require('../assets/userOne.png'),
      date: '09 червня, 2020',
      time: '09:14',
      text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    },
    {
        id: 12,
        author:'user',
      date: '09 червня, 2020',
      time: '09:20',
      userAvatar: require('../assets/userTwo.png'),
      text: 'Thank you! That was very helpful!',
    },
  ],
};
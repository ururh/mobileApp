export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

export const setPhotoData = (data) => {
  return {
    type: 'SET_PHOTO_DATA',
    payload: data,
  };
};
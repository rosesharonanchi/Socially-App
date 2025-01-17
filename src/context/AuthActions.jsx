export const LoginStart = (userCredential) => ({
     type: "LOGIN_START",
     payload: userCredential,
});
export const LoginSuccess = (user) => ({
     type: "LOGIN_SUCESS",
     payload: user,
});
export const LoginFailure = (error) => ({
     type: "LOGIN_FAILURE",
     payload: error,
});

export const Follow = (userId) => ({
     type: "FOLLOW",
     payload: userId,
});
export const UnFollow = (userId) => ({
     type: "UNFOLLOW",
     payload: userId,
});

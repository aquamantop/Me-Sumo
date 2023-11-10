export const useSignup = () => {

    const signup = (userName, firstName, lastName, email, password) => {
  
      const signupResponse = fetch(
        'http://ec2-50-17-115-59.compute-1.amazonaws.com:8090/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName, firstName, lastName, email, password }),
        }
      ).then(response => {
        console.log(response)
        if (response.status === 403) {
          throw new Error  ("Usuario ya registrado")
        } else if (response.status !== 201) {
          throw new Error("Lamentablemente no ha podido registrarse. Por favor intente más tarde")
        } else {
          return response.json()
        }
      })
        .then(result => {
          return {
            result,
            error: false,
          }
        })
        .catch(e => {
          return {
            error: e.message
          }
        })
      return signupResponse
    }
    return { signup };
  };
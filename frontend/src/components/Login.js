import React from 'react'; 

function Login({onLogin}) {
  const initialData={email: '', password: ''}
  const [data, setData]=React.useState(initialData);

  const handleChange = (evt) => {
    const {name, value}=evt.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    
    onLogin(data)
      .catch(err => {
        console.log(`Пользователь с email не найден: ${err}`);
      })
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <h2 className="login__heading">Вход</h2>
        <input className="login__input" type="email" name="email" 
        value={data.email} onChange={handleChange} required placeholder="Email" />
        <input className="login__input" type="password" name="password" 
        value={data.password} onChange={handleChange} required placeholder="Пароль" 
        minLength="8" maxLength="12" />
        <button type="submit" className="button login__button" >Войти</button>
      </form>
    </div>
  );
}

export default Login;
<script>
  let email = '';
  let password = '';
  let message = '';
    
  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // ⭐⭐ STOCKE LE TOKEN ! ⭐⭐
        localStorage.setItem('token', result.token);
        message = 'Login successful! Redirecting...';
        
        // Redirige vers l'accueil après login
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
        
      } else {
        message = result.error || 'Login failed!';
      }
      
    } catch (error) {
      message = 'Login failed!';
    }
  }
</script>
<form on:submit={handleSubmit}>
  <h1>Login</h1>

  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />

  <button type="submit">Login</button>
</form>

{#if message}
  <p>{message}</p>
{/if}

<style>
  /* GARDE TON STYLE EXACTEMENT COMME TU L'AS FAIT */
  :global(.touched:invalid) {
    border-color: red;
    outline-color: red;
  }
  form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #0ff;  /* Corrigé "border-color" → "border" */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);  /* Ombre pour effet carte */
}

input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #0ff; 
  border-radius: 5px;
  font-size: 1rem;
  background: transparent;
  color: #0ff; 
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;  /* Vert gaming */
  color: #0ff;
  border: 1px solid #0ff;
  border-radius: 5px;
}

button:hover {
  background-color: 1px solid #0ff; 
  color: 1px solid #0ff;
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #0ff; 
}


</style>

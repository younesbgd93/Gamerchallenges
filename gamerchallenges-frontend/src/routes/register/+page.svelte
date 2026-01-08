<script>
 let email = '';
  let password = '';
  let message = '';
  let pseudo = '';
  let numeroTelephone = '';
  
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password , pseudo,numeroTelephone})
      });
        const result = await response.json();
        message = result.message || 'Registration successful!';
    } catch (error) {
      message = 'Registration failed!';
    }
  }

</script>
<form on:submit={handleSubmit}>
  <h1>Inscription</h1>

  <input type="text" bind:value={pseudo} placeholder="Pseudo" required />
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <input type="text" bind:value={numeroTelephone} placeholder="Numéro de téléphone" required />

  <button type="submit">Register</button>
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
  font-style:bold;
}
button {
  padding: 0.75rem;
  color: #0ff;
  background-color: transparent;  
  border: 1px solid #0ff;
  border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
}
button:hover {  
    background-color: 1px solid #0ff; 
    color:1px solid #0ff;
}   

:global(.container) {
    padding-left: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #0ff; 
}
</style>
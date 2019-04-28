import React, { Component } from 'react'

import Cookies from 'js-cookie'

export const Login = () => (<div>
    <h2>Login</h2>
        <form method="post" action='/accounts/login/'>
        <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
        <p><label for="id_username">Username:</label> <input type="text" name="username" autofocus required id="id_username" /></p>
        <p><label for="id_password">Password:</label> <input type="password" name="password" required id="id_password" /></p>
        <button type="submit">Login</button>
        </form>
    </div>)

export const Signup = () => (<div>
    <h2>Sign Up</h2>
        <form method="post" action='/accounts/signup/'>
            <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get('csrftoken')} />
            <p>
                <label for="id_username">Username:</label> <input type="text" name="username" maxlength="150" autofocus required id="id_username" /> 
                <span class="helptext">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span>
            </p>
            <p>
                <label for="id_password1">Password:</label> <input type="password" name="password1" required id="id_password1"/> 
                <span class="helptext"><ul>
                    <li>Your password can&#39;t be too similar to your other personal information.</li>
                    <li>Your password must contain at least 8 characters.</li><li>Your password can&#39;t be a commonly used password.</li>
                    <li>Your password can&#39;t be entirely numeric.</li>
                </ul></span>
            </p>
            <p>
                <label for="id_password2">Password confirmation:</label> 
                <input type="password" name="password2" required id="id_password2"/> 
                <span class="helptext">Enter the same password as before, for verification.</span>
            </p>
            <button type="submit">Sign up</button>
        </form>
    </div>)

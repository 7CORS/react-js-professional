import './styles.css';

import { useContext, useState } from 'react';

import { ChangeEventT, FormEventT } from '../../../utils/TypesEvents';
import * as authService from '../../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../utils/ContextToken';

import { LoginFormData } from '../../../models/LoginFormData';
import FormInput from '../../../components/FormInput';

import * as forms from '../../../utils/Forms/forms';

export default function Login() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const { setContextTokenPayload } = useContext(ContextToken);

    const [formData, setFormData] = useState<LoginFormData>({
        username: {
            value: "",
            id: "username",
            name: "username",
            type: "text",
            placeholder: "Email",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
            },
            message: "Favor informar um email válido",
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Senha",
        }
    });

    function handleSubmit(event: FormEventT) {
        event.preventDefault();
        
        setSubmitResponseFail(false);

        const formDataValidated = forms.dirtyAndValidateAll(formData);
        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }

        setLoading(true);
        setError('');

        //authService.loginRequest({ username: formData.username.value, password: formData.password.value })
        authService.loginRequest(forms.toValues(formData))
            .then((response) => {

                // Sucesso na autenticação
                authService.saveAccessToken(response.data.access_token);

                // Seta o Contexto atualizando globalmente o contextTokenPayload onde estiver
                setContextTokenPayload(authService.getAccessTokenPayload());

                // Redireciona
                navigate("/cart");

                // Atualiza o estado global/auth ou redirecione o usuário
                setLoading(false);
            })
            .catch(() => {
                setError('Falha no login. Por favor, verifique suas credenciais.');
                setLoading(false);
                setSubmitResponseFail(true);
            });
    }

    function handleInputChange(event: ChangeEventT) {
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }

    function handleTurnDurty(name: string) {
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    return (
        <main>
            <section id="login-section" className="dsc-container">
                <div className="dsc-login-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.username}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDurty}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <div className="dsc-form-error">{formData.username.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.password}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDurty}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {
                            submitResponseFail &&
                            <div className="dsc-form-global-error">
                                Usuário ou senha inválidos.
                            </div>
                        }

                        <div className="dsc-login-form-buttons">
                            <button
                                type="submit"
                                className="dsc-btn dsc-btn-blue"
                                disabled={loading}>Entrar
                            </button>
                        </div>

                        {loading && <p>Carregando...</p>}
                        {error && <div className="dsc-form-error">{error}</div>}
                    </form>
                </div>
            </section>
        </main>
    );
}
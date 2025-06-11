import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../AuthContext/AuthContext';
import { authAPI } from '../services/api.jsx';

export default function Settings() {
  const { user, logout } = useAuth();

  // États pour le formulaire de changement d'email
  const [emailForm, setEmailForm] = useState({
    currentEmail: user?.email || '',
    newEmail: '',
    confirmEmail: ''
  });

  // États pour le formulaire de changement de mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // États pour les messages de succès/erreur
  const [emailMessage, setEmailMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Gérer les changements dans le formulaire email
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer le message quand l'utilisateur tape
    if (emailMessage.text) {
      setEmailMessage({ type: '', text: '' });
    }
  };

  // Gérer les changements dans le formulaire mot de passe
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer le message quand l'utilisateur tape
    if (passwordMessage.text) {
      setPasswordMessage({ type: '', text: '' });
    }
  };

  // Soumettre le changement d'email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Validation basique
    if (!emailForm.newEmail || !emailForm.confirmEmail) {
      setEmailMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
      return;
    }

    if (emailForm.newEmail !== emailForm.confirmEmail) {
      setEmailMessage({ type: 'error', text: 'Les adresses email ne correspondent pas' });
      return;
    }

    if (emailForm.newEmail === emailForm.currentEmail) {
      setEmailMessage({ type: 'error', text: 'La nouvelle adresse email doit être différente de l\'actuelle' });
      return;
    }

    // Appel API pour changer l'email
    try {
      const response = await authAPI.updateUser(emailForm.currentEmail, ({ email: emailForm.newEmail }))
      setEmailMessage({ type: 'success', text: 'Adresse email mise à jour avec succès!' });
      setEmailForm(prev => ({ ...prev, newEmail: '', confirmEmail: '' }));

    } catch (error) {
      setEmailMessage({ type: 'error', text: 'Erreur lors de la mise à jour de l\'email' });
    }
  };

  // Soumettre le changement de mot de passe
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Validation basique
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    // Ici vous ajouterez votre logique d'appel API
    console.log('Changement de mot de passe:', {
      currentPassword: passwordForm.currentPassword,
      // Ne pas logger le nouveau mot de passe en production
    });

    // Simulation de succès (à remplacer par votre logique)
    setPasswordMessage({ type: 'success', text: 'Mot de passe mis à jour avec succès!' });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onLogout={logout} />

      <main className="py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                Paramètres
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Gérez vos informations de compte et vos préférences
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Section Changement d'email */}
            <div className="bg-white shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Changer l'adresse email
                </h3>

                {/* Message d'état pour email */}
                {emailMessage.text && (
                  <div className={`mb-4 rounded-md p-4 ${emailMessage.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {emailMessage.type === 'success' ? (
                          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">{emailMessage.text}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="currentEmail" className="block text-sm font-medium text-gray-700">
                      Adresse email actuelle
                    </label>
                    <input
                      type="email"
                      id="currentEmail"
                      name="currentEmail"
                      value={emailForm.currentEmail}
                      disabled
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-gray-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
                      Nouvelle adresse email
                    </label>
                    <input
                      type="email"
                      id="newEmail"
                      name="newEmail"
                      value={emailForm.newEmail}
                      onChange={handleEmailChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="nouvelle@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
                      Confirmer la nouvelle adresse email
                    </label>
                    <input
                      type="email"
                      id="confirmEmail"
                      name="confirmEmail"
                      value={emailForm.confirmEmail}
                      onChange={handleEmailChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="nouvelle@email.com"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Mettre à jour l'email
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Section Changement de mot de passe */}
            <div className="bg-white shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Changer le mot de passe
                </h3>

                {/* Message d'état pour mot de passe */}
                {passwordMessage.text && (
                  <div className={`mb-4 rounded-md p-4 ${passwordMessage.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {passwordMessage.type === 'success' ? (
                          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">{passwordMessage.text}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Mot de passe actuel
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Mot de passe actuel"
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Nouveau mot de passe (min. 6 caractères)"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Confirmer le nouveau mot de passe"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Mettre à jour le mot de passe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

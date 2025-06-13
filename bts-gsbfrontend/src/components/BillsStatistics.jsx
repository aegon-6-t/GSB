import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function BillsStatistics({ bills }) {
  // Fonction pour calculer les statistiques des statuts
  const getStatusStats = () => {
    const statusCounts = bills.reduce((acc, bill) => {
      acc[bill.status] = (acc[bill.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: [
            '#10B981', // Vert pour Approved
            '#EF4444', // Rouge pour Rejected  
            '#F59E0B', // Orange pour Pending
          ],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };
  };

  // Fonction pour calculer les statistiques par type de facture
  const getTypeStats = () => {
    const typeCounts = bills.reduce((acc, bill) => {
      acc[bill.type] = (acc[bill.type] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(typeCounts),
      datasets: [
        {
          label: 'Nombre de factures',
          data: Object.values(typeCounts),
          backgroundColor: '#3B82F6',
          borderColor: '#1D4ED8',
          borderWidth: 1,
        },
      ],
    };
  };

  // Fonction pour calculer les montants par mois
  const getMonthlyAmounts = () => {
    const monthlyData = bills.reduce((acc, bill) => {
      const date = new Date(bill.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += bill.amount;
      return acc;
    }, {});

    // Trier les mois par ordre chronologique
    const sortedMonths = Object.keys(monthlyData).sort();

    return {
      labels: sortedMonths.map(month => {
        const [year, monthNum] = month.split('-');
        const date = new Date(year, monthNum - 1);
        return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
      }),
      datasets: [
        {
          label: 'Montant total (€)',
          data: sortedMonths.map(month => monthlyData[month]),
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          fill: true,
        },
      ],
    };
  };

  // Calcul des statistiques générales
  const totalBills = bills.length;
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const averageAmount = totalBills > 0 ? totalAmount / totalBills : 0;
  const approvedBills = bills.filter(bill => bill.status === 'Approved').length;
  const pendingBills = bills.filter(bill => bill.status === 'Pending').length;
  const rejectedBills = bills.filter(bill => bill.status === 'Rejected').length;

  // Options pour les graphiques
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (bills.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Statistiques des factures
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune facture disponible pour afficher les statistiques</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Titre de la section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Statistiques des factures</h2>
        <p className="text-gray-600">Aperçu de vos données financières</p>
      </div>

      {/* Cartes de statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total factures</p>
              <p className="text-2xl font-semibold text-gray-900">{totalBills}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Montant total</p>
              <p className="text-2xl font-semibold text-gray-900">{totalAmount.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Montant moyen</p>
              <p className="text-2xl font-semibold text-gray-900">{averageAmount.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">En attente</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingBills}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique en secteurs pour les statuts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par statut</h3>
          <div className="h-64">
            <Doughnut data={getStatusStats()} options={doughnutOptions} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Approuvées</span>
              </div>
              <p className="font-semibold text-green-600">{approvedBills}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Rejetées</span>
              </div>
              <p className="font-semibold text-red-600">{rejectedBills}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>En attente</span>
              </div>
              <p className="font-semibold text-yellow-600">{pendingBills}</p>
            </div>
          </div>
        </div>

        {/* Graphique en barres pour les types */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Factures par type</h3>
          <div className="h-64">
            <Bar data={getTypeStats()} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Graphique linéaire pour l'évolution mensuelle */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution mensuelle des montants</h3>
        <div className="h-64">
          <Line data={getMonthlyAmounts()} options={chartOptions} />
        </div>
      </div>
    </div>
  );
} 
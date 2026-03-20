export const MOCK_DATA = {
  clients: [
    { id: '1', name: 'Burger King', type: 'Restaurant', contact: 'bk@example.com' },
    { id: '2', name: 'Cafe Martinez', type: 'Cafe', contact: 'martinez@example.com' },
    { id: '3', name: 'Nike', type: 'Brand', contact: 'nike@example.com' },
  ],
  influencers: [
    { id: '1', name: 'Juan Perez', niche: 'LifeStyle', followers: 150000 },
    { id: '2', name: 'Maria Gomez', niche: 'Foodie', followers: 80000 },
    { id: '3', name: 'Carlos Gym', niche: 'Fitness', followers: 300000 },
  ],
  providers: [
    { id: '1', name: 'Estudio Alpha', service: 'Filmmaker' },
    { id: '2', name: 'LensPro', service: 'Fotógrafo' },
    { id: '3', name: 'EditMaster', service: 'Editor' },
  ],
  proposals: [
    {
      id: '1',
      title: 'Campaña Hamburguesa Nueva',
      client_id: '1',
      influencer_id: '2',
      provider_id: '1',
      budget: 5000,
      commission_rate: 0.20,
      status: 'En curso',
      date: '2026-03-20',
    },
    {
      id: '2',
      title: 'Lanzamiento Zapatillas',
      client_id: '3',
      influencer_id: '3',
      provider_id: '2',
      budget: 12000,
      commission_rate: 0.15,
      status: 'Finalizado',
      date: '2026-03-15',
    },
    {
      id: '3',
      title: 'Promoción Desayuno',
      client_id: '2',
      influencer_id: '1',
      provider_id: '3',
      budget: 2000,
      commission_rate: 0.15,
      status: 'Pendiente',
      date: '2026-03-25',
    }
  ]
};

export const niches = {
  // --- TEMA 1: JURÍDICO (DARK LUXURY) ---
  advogado: {
    style: {
      mode: 'dark',
      font: 'serif',
      // Mapeamento para Variáveis CSS
      colors: {
        '--background': '#0F172A', // Navy Dark
        '--foreground': '#E2E8F0', // Texto Claro
        '--primary': '#C5A059',    // Dourado
        '--primary-foreground': '#0F172A',
        '--secondary': '#1e293b',
        '--accent': '#C5A059',
        '--border': 'rgba(197, 160, 89, 0.2)'
      }
    },
    hero: {
      badge: 'Software Jurídico #1',
      title: 'Domine seus <br/><span class="text-primary">Prazos e Processos</span>',
      subtitle: 'A inteligência definitiva para escritórios que não admitem erros.',
      cta: 'Começar Teste Gratuito',
      image: null
    },
    features: [ /* ... mantenha igual ... */ ],
    showcase: [] // Adicione se necessário
  },

  // --- TEMA 2: TERRAPLANAGEM (INDUSTRIAL) ---
  terraplanagem: {
    style: {
      mode: 'industrial',
      font: 'sans',
      colors: {
        '--background': '#FFFFFF',
        '--foreground': '#18181B', // Zinc 900
        '--primary': '#EAB308',    // Amarelo
        '--primary-foreground': '#000000',
        '--secondary': '#FAFAFA',
        '--accent': '#000000',
        '--border': '#E4E4E7'
      }
    },
    hero: {
      badge: 'Gestão de Maquinário v4.0',
      title: 'CONTROLE TOTAL <br/>DA <span class="text-primary">SUA OBRA.</span>',
      subtitle: 'Monitore combustível e horas trabalhadas em um painel robusto.',
      cta: 'Iniciar Teste de Campo',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop'
    },
    features: [ /* ... mantenha igual ... */ ],
    showcase: []
  },

  // --- TEMA MASTER (PORTFÓLIO DEV) ---
  default: {
    style: {
      mode: 'master',
      font: 'sans',
      colors: {
        '--background': '#000000',
        '--foreground': '#FFFFFF',
        '--primary': '#FFFFFF',
        '--primary-foreground': '#000000',
        '--secondary': 'rgba(255,255,255,0.1)',
        '--accent': '#A855F7', // Roxo
        '--border': 'rgba(255,255,255,0.1)'
      }
    },
    hero: {
      badge: 'Agenda Q1 2025 Aberta',
      title: 'Não é só código.<br/>É Engenharia de <span class="text-accent">Vendas.</span>',
      subtitle: 'Interfaces "Camaleão" que mudam radicalmente para se alinhar ao seu cliente.',
      cta: 'Ver a Diferença'
    },
    // ... Mantenha features e showcase do passo anterior
    features: [
      { title: 'Design Adaptativo', desc: 'Adaptação total de cores e layout.', icon: '🎨' },
      { title: 'Performance', desc: 'Carregamento instantâneo com Tailwind.', icon: '⚡' },
      { title: 'Conversão', desc: 'Foco total em vendas e leads.', icon: '🎯' }
    ],
    showcase: [
      { id: 'advogado', title: 'LexFlow', desc: 'Software Jurídico High-Ticket', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800', color: '#C5A059' },
      { id: 'terraplanagem', title: 'TerraForce', desc: 'Gestão de Maquinário Pesado', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800', color: '#EAB308' }
    ]
  }
};
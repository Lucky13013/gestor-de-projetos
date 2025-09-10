import React, { useState } from 'react';
import './App.css'; // Importa o ficheiro de estilos CSS
import { FiSearch, FiFileText, FiUser, FiBriefcase, FiArrowLeft, FiPlusCircle, FiLogIn, FiLogOut } from 'react-icons/fi';

// --- Dados Fictícios (Simulação de Banco de Dados) ---
const mockProjects = [
  { id: 1, title: 'Software 3D para Simulação de Vazamentos', tags: ['Simulação', 'Engenharia'], creationDate: '2024-08-15', allocated: true, description: 'Desenvolvimento de software para simulação 3D de vazamentos de derivados de petróleo em dutos longos, em parceria com a PETROBRAS.', link: '#', authors: ['Prof. Dr. Silva'], clients: ['PETROBRAS'], evaluation: 'Pendente', deadline: '2025-08-15' },
  { id: 2, title: 'Análise de Dados de Sensores IoT', tags: ['IoT', 'Dados'], creationDate: '2024-05-20', allocated: false, description: 'Coleta e análise de dados de sensores para otimização da irrigação.', link: '#', authors: ['Prof. Dr. Santos'], clients: ['AgroTech Corp.'], evaluation: 'Aprovado', deadline: '2024-12-20' },
  { id: 3, title: 'Plataforma Web para Gestão de Voluntários', tags: ['Web', 'React'], creationDate: '2024-09-01', allocated: true, description: 'Criação de um sistema para ONGs gerenciarem seus voluntários e eventos.', link: '#', authors: ['Mariana Lima'], clients: ['ONG Mãos que Ajudam'], evaluation: 'Aprovado', deadline: '2025-03-01' },
];

// --- Componentes Reutilizáveis ---
const Header = ({ navigateTo, isLoggedIn, logout }) => (
    <header className="app-header">
        <div className="header-content">
            <h1 className="header-title" onClick={() => navigateTo('home')}>Gestor de Projetos</h1>
            <div className="search-bar">
                <FiSearch />
                <input type="text" placeholder="Pesquisar projetos..." />
            </div>
            {isLoggedIn ? (
                <button onClick={logout} className="header-button">
                    <FiLogOut /> Sair
                </button>
            ) : (
                <button onClick={() => navigateTo('userSelection')} className="header-button">
                    <FiLogIn /> Entrar ou Cadastrar
                </button>
            )}
        </div>
    </header>
);

// --- Componentes de Página ---

const HomePage = ({ navigateTo }) => (
    <>
        <div className="dashboard-grid">
             <div className="dashboard-card">
                <h3>Projetos Ativos</h3>
                <p className="stat-number">2</p>
            </div>
            <div className="dashboard-card">
                <h3>Projetos Disponíveis</h3>
                <p className="stat-number">1</p>
            </div>
             <div className="dashboard-card cta-card" onClick={() => navigateTo('registerProject')}>
                <FiPlusCircle size={30}/>
                <h3>Submeter Novo Projeto</h3>
            </div>
        </div>
        <div className="main-actions">
            <h2 className="section-title">Ações Rápidas</h2>
            <div className="button-group">
                <button onClick={() => navigateTo('search')} className="secondary-button"><FiSearch /> Pesquisar Projetos</button>
                <button onClick={() => navigateTo('history')} className="secondary-button"><FiFileText /> Histórico de Registos</button>
            </div>
        </div>
    </>
);

const UserTypeSelectionPage = ({ navigateTo }) => (
    <div className="centered-page">
        <button onClick={() => navigateTo('home')} className="back-button-corner"><FiArrowLeft /> Voltar</button>
        <div className="selection-content">
            <h1 className="page-title">Como deseja aceder?</h1>
            <p className="page-subtitle">Selecione o seu tipo de perfil para continuar.</p>
            <div className="user-type-cards">
                <div className="user-type-card" onClick={() => navigateTo('loginAluno')}>
                    <FiUser size={40} />
                    <h2>Aluno</h2>
                    <p>Aceda a projetos e oportunidades.</p>
                </div>
                <div className="user-type-card" onClick={() => navigateTo('loginCliente')}>
                    <FiBriefcase size={40} />
                    <h2>Cliente</h2>
                    <p>Submeta e acompanhe os seus projetos.</p>
                </div>
            </div>
        </div>
    </div>
);

const LoginAlunoPage = ({ navigateTo, login }) => (
  <div className="centered-page">
    <div className="auth-form-container">
      <button onClick={() => navigateTo('userSelection')} className="back-button"><FiArrowLeft /> Trocar Perfil</button>
      <h1 className="page-title">Acesso do Aluno</h1>
      <input type="text" placeholder="Nome Completo" className="form-input" />
      <input type="text" placeholder="Matrícula" className="form-input" />
      <input type="email" placeholder="Email Institucional" className="form-input" />
      <input type="text" placeholder="Curso" className="form-input" />
      <button onClick={login} className="primary-button full-width">Entrar</button>
    </div>
  </div>
);

const LoginClientePage = ({ navigateTo, login }) => (
  <div className="centered-page">
    <div className="auth-form-container">
      <button onClick={() => navigateTo('userSelection')} className="back-button"><FiArrowLeft /> Trocar Perfil</button>
      <h1 className="page-title">Acesso do Cliente</h1>
      <input type="text" placeholder="Nome ou Empresa" className="form-input" />
      <input type="email" placeholder="Email de Contato" className="form-input" />
      <button onClick={login} className="primary-button full-width">Entrar</button>
    </div>
  </div>
);

const RegisterProjectPage = ({ navigateTo }) => (
    <>
        <button onClick={() => navigateTo('home')} className="back-button"><FiArrowLeft /> Voltar à Página Inicial</button>
        <h1 className="page-title">Registar Novo Projeto</h1>
        <div className="form-container centered-form">
          <input type="text" placeholder="Nome do Projeto" className="form-input" />
          <input type="text" placeholder="Tags/Temas (separados por vírgula)" className="form-input" />
          <textarea placeholder="Descrição detalhada" className="form-textarea"></textarea>
          <button onClick={() => { alert('Projeto registado (simulação)'); navigateTo('home'); }} className="primary-button">Registar</button>
        </div>
    </>
);

const SearchPage = ({ projects, selectProject }) => (
    <>
        <h1 className="page-title">Pesquisar Projetos</h1>
        <div className="project-list">
        {projects.map(p => (
            <div key={p.id} className="project-card" onClick={() => selectProject(p)}>
            <h3>{p.title}</h3>
            <p className="project-description">{p.description.substring(0, 120)}...</p>
            <div className="card-footer">
                <div className="tags">{p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
                <span className={`status ${p.allocated ? 'allocated' : 'not-allocated'}`}>{p.allocated ? 'Alocado' : 'Disponível'}</span>
            </div>
            </div>
        ))}
        </div>
    </>
);

const HistoryPage = ({ projects, selectProject }) => (
    <>
        <h1 className="page-title">Histórico de Registo</h1>
        <div className="project-list">
            {projects.map(p => (
            <div key={p.id} className="project-card" onClick={() => selectProject(p)}>
                <h3>{p.title}</h3>
                <p>Data de Criação: {p.creationDate}</p>
                <div className="card-footer">
                    <div className="tags">
                    <span className={`status ${p.allocated ? 'allocated' : 'not-allocated'}`}>{p.allocated ? 'Alocado' : 'Não Alocado'}</span>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </>
);

const ProjectPage = ({ navigateTo, project }) => (
    <>
        <button onClick={() => navigateTo('search')} className="back-button"><FiArrowLeft /> Voltar para Pesquisa</button>
        <h1 className="page-title">{project.title}</h1>
        <div className="project-details-card">
            <p><strong>Descrição:</strong> {project.description}</p>
            <p><strong>Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">Aceder ao repositório</a></p>
            <p><strong>Autores:</strong> {project.authors.join(', ')}</p>
            <p><strong>Clientes:</strong> {project.clients.join(', ')}</p>
            <p><strong>Data de criação:</strong> {project.creationDate}</p>
            <p><strong>Avaliação:</strong> {project.evaluation}</p>
            <p><strong>Prazo:</strong> {project.deadline}</p>
        </div>
        <div className="professor-actions">
            <h3>Ações do Professor</h3>
            <button className="secondary-button">Alocar alunos</button>
            <button className="secondary-button">Avaliar</button>
        </div>
    </>
);

// --- Componente Principal (Controlador de Estado) ---
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const navigateTo = (page) => setCurrentPage(page);

  const login = () => {
    alert('Login efetuado (simulação)');
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home'); // Volta para a página inicial pública
  };

  const selectProject = (project) => {
    setSelectedProject(project);
    navigateTo('project');
  };

  const renderPage = () => {
    switch (currentPage) {
        case 'userSelection':
            return <UserTypeSelectionPage navigateTo={navigateTo} />;
        case 'loginAluno':
            return <LoginAlunoPage navigateTo={navigateTo} login={login} />;
        case 'loginCliente':
            return <LoginClientePage navigateTo={navigateTo} login={login} />;
        case 'search':
            return <SearchPage projects={mockProjects} selectProject={selectProject} />;
        case 'history':
            return <HistoryPage projects={mockProjects} selectProject={selectProject} />;
        case 'project':
            return <ProjectPage navigateTo={navigateTo} project={selectedProject} />;
        case 'registerProject':
            return <RegisterProjectPage navigateTo={navigateTo} />;
        case 'home':
        default:
            return <HomePage navigateTo={navigateTo}/>;
    }
  };

  return (
    <div className="app-container">
        <Header navigateTo={navigateTo} isLoggedIn={isLoggedIn} logout={logout} />
        <main className="main-content">
            {renderPage()}
        </main>
    </div>
  );
}

export default App;


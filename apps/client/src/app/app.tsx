import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './contexts/auth-provider/auth-provider';
import EditorProvider from './contexts/editor-provider/editor-provider';
import { useState } from 'react';
import { EditorDocument } from './types';
import ApplicationFrame from './layouts/application-frame/application-frame';
import Header from './layouts/header/header';
import Navbar from './layouts/navbar/navbar';
import Sidebar from './layouts/sidebar/sidebar';
import Footer from './layouts/footer/footer';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'tabler-icons-react';
import Home from './screens/home/home';
import Login from './screens/login/login';
import Register from './screens/register/register';
import Groups from './screens/groups/groups';
import Group from './screens/group/group';
import Creator from './screens/creator/creator';
import Create from './screens/create/create';
import Games from './screens/games/games';
import Game from './screens/game/game';
import Profile from './screens/profile/profile';
import Settings from './screens/settings/settings';

const sampleMemes = [
  {
    url: 'https:images-ext-2.discordapp.net/external/Yq9r5xwqHCDH2DIqO6Q-OvfF8swFNw1O7iGtpDPmEuk/https/indianmemetemplates.com/wp-content/uploads/Quiz-Kid.jpg?width=594&height=562',
    id: 'hi-mom',
  },
  {
    url: 'https://memetemplate.in/uploads/1639171849.jpeg',
    id: 'hi-mom-2',
  },
  {
    url: 'https://i.kym-cdn.com/photos/images/original/001/167/523/ada.jpg',
    id: 'hi-mom-3',
  },
  {
    url: 'https://i.imgflip.com/1quxff.jpg',
    id: 'hi-mom-4',
  },
];

export function App() {
  const [setDoc] = useState<EditorDocument>();
  return (
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        theme={{ colorScheme: 'dark' }}
      >
        <AuthProvider>
          <ApplicationFrame
            header={<Header />}
            navbar={<Navbar />}
            sidebar={<Sidebar />}
            footer={<Footer />}
          >
            <EditorProvider
              images={sampleMemes}
              onDocumentSubmit={(data) => {
                console.log('Document submitted', data);
                setDoc(data);
              }}
            >
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/groups" element={<Groups/>}/>
                  <Route path="/groups/:groupId" element={<Group/>}/>
                  <Route path="/create" element={<Creator/>}/>
                  <Route path="/create/:createId" element={<Create/>}/>
                  <Route path="/games" element={<Games/>}/>
                  <Route path="/games/:gameId" element={<Game/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/settings" element={<Settings/>}/>
                </Routes>
              </BrowserRouter>
            </EditorProvider>
          </ApplicationFrame>
        </AuthProvider>
      </MantineProvider>
  );
}

export default App;

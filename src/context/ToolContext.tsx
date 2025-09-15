'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type Tool = {
  hash: string;
  name: string;
  location: string;
  status: string;
  updatedAt: string;
  notes: string;
};

type ToolContextValue = {
  tools: Tool[];
  updateTool: (hash: string, data: Partial<Tool>) => void;
  addTool: (tool: Tool) => void;
};

const ToolContext = createContext<ToolContextValue | undefined>(undefined);

const baseTools: Omit<Tool, 'updatedAt'>[] = [
  {
    hash: '28e21791f8ad1d677a8dd01ec66bad490897748e0471fad7a9e2da08aa6d5116',
    name: 'Camera d’inspection Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'f65f52f425d18e0ebb765bcadf0b8848a87c55a573e70e9413768ff5bf483d62',
    name: 'Camera d’inspection Paris',
    location: 'Paris',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'd4132d78e5faecf4a32ae3c3d43eae2393320325e64c8d4877ed192f85f85ca3',
    name: 'Capteur pression Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'e0d338d187be0a8befae4941759c83597df7c6fd0383cc6e5e1b46388b8e09f9',
    name: 'Clef serre tube Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'df356c59532f844b3f19831c01fa17efabc9bf7acf18e8f56c27b51bc2e91a59',
    name: 'Clé démontage écrou injection 155',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'fc75f6b97dc9d2dbdd1de74bcafbea0323c9a3eec5e3496cc6fec6272ac86f74',
    name: 'Clé démontage écrou injection 180',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '9885179c67e34979c2a066f4eb85602ba567ab1e2e5c74ec5a6d0e5f924c8976',
    name: 'Extracteur à choc',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '8cd4286fc6ef29feee992642cb4effdb45abbf0db8f32a557131006d977e5daa',
    name: 'Clé dynamométrique Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'c09a90427a0bfcbbc53d2ee0ecd6b92163de91904cfd3ccb2410fba802c40d2a',
    name: 'Clé hydraulique',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'a171feea2e523a89655015f1c3a28ae07c6f9f6a3c7d7d84e2e4be6a365649c8',
    name: 'Clé démontage écrou injection 320',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'ce906580036e266eee66695e263c96fa05ae1c0c57e7c2437460c8d3ab664f64',
    name: 'Clé démontage écrou injection 360',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '13878e5ac1e6eb946dc359372ffb8278f26ffdb61858e52677dd5b16bb69a70e',
    name: 'Clé démontage écrou injection 271',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '98272abe8a8a5f374de4b895db9e9dd014a9ff94faef0dca771b40042ba40333',
    name: 'Clé démontage écrou injection 300',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '5b7135892140d0799f7d223889574c5e357d11c960e55a31989fbd65df2f0a1f',
    name: 'Clé démontage écrou injection 215',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '12076448b7af17ab31f5ed710fb21c82ec9cc45855e21b00f8e48cbfa0cd7b8c',
    name: 'Kit changement codeur Baumueller Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: '8c9092b1323e559f3c6edf26e62b1b0f18a77e3ce5eb095811dcfd97cf0047bc',
    name: 'Kit charge accu',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '10f8cf51cdda486bc7b7209f10329e5ef3573a60a48e58e50f60b2eeade9fec8',
    name: 'Jeux démontage vis à billes Paris',
    location: 'Paris',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'a38c6c44a58025e5869de2fd8e9fbf0e5555f63b7b6bc82dd57a974dd37ef8c0',
    name: 'Jeux démontage vis à billes Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'dd6bba80f1afb443646b627945dea13e934460c244bf0c9b8781fad2c48a4d97',
    name: 'Extracteur hydraulique Paris',
    location: 'Paris',
    status: 'OK',
    notes: ''
  },
  {
    hash: '6beb97aebcb3e1d7a1d1018ccc18bdcaaa8272480b20b81c9f88883d5445d386',
    name: 'Jeu de tournevis (outil de démontage joint) Paris',
    location: 'Paris',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'b3d20d225cba3ec867453070bfb34d6ab8eca23f99e2c2933233be0629f7cd3c',
    name: 'Jeu de clés à ergots',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '86dbe80467a55d92a092e053738a849d4a89f0b9b33c351d62cff79ad6e3b749',
    name: 'Douilles visseuse Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: '3374866e53a99772c30e6399ca5d2fb14d76549fca7091ff0b418775a5c56f50',
    name: 'Cric(h)et hydraulique 4 tonnes',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'ebabace95e7bd3fd76a6966255462950acef16c8ba5f08ee146417ea9db2cfce',
    name: 'Comparateur intérieur pour contrôle fourreau',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '5ce7c2e75b0ff1f888af60f4ef2622d822dd7e11346faeb8af644315fba7e77b',
    name: 'Clé plate Ø70 Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: '096247e176d9f4fffb429cfdd499cb16fe1ea260d7321fa8590ef6074932e4f0',
    name: 'Pince à cercler les joints Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: '37cfcee4ad21b8b628f145accb30c2c6685435f56d40421f2ee5b9081249e577',
    name: 'Outil démontage écrou colonne DUO',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '67a7576288b963423b790e5191f232cdf10b50c227193e6597a1b734e1f4041f',
    name: 'Niveau à cadre Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: '5284bdddb151c8247e69bd79786babe61cf4acd65b4c48422846c722c4c34b93',
    name: 'Micromètre intérieur contrôle fourreau (Ø50–100)',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '2b8ddf0c206382d83a1c416827c266cda36b505b806132c11fbc56ed7a34728a',
    name: 'Micromètre extérieur vis',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'c0015526aea5ad8fa1fb0bdf58e2bb6e6e8453ba67c21772bc230577d04cad91',
    name: 'Micromètre extérieur vis 2',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '36d4225d58db72cec5b239b0ab15852e756a22305bafe2fa5b7b211c52ac13ad',
    name: 'Micromètre 3 touches Ø20–50 Paris',
    location: 'Paris',
    status: 'OK',
    notes: ''
  },
  {
    hash: '6138ad1075bbfceb7817cba1a1ca788e959f3dbccfd9673b9992cb944fa0ca26',
    name: 'Kit harnais + casque Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: '8deb90eae3b8ea52a7eff72469c7f7c779108f06ad4a392be12cc8c49d1b64c0',
    name: 'Kit de réparation standard',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: '7aad522290c5d9cdcd72658b47f0924cd38d895b8563f965c9ce7eb935a12788',
    name: 'Visseuse électrique à choc Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: '5cdf61b264dc41d20413363d2e5a83778a4ace66afff747b47ff382c1abbfeb5',
    name: 'Vérin 30 cm Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'fd51a526eed29b689168c315540ab955750c54df32f9a70ab3e26a15eb0aaabf',
    name: 'Testeur isolement Iso-tech Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'e8d0fac80071e4b61078ec25cdc584abaab0fded14368b208d97a2a3a2c6f870',
    name: 'Règle de niveau jeu 2 Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: '24b6c0acd356b54982abb2126665e88aebd056d84838dc8dcee357dc7b7a167f',
    name: 'Règle de niveau jeu 1 Gleizé',
    location: 'Gleizé',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'c475279b4a8dd1ddc6d4cadab70cdbff0ee01f7b61827f9282bc690d43ab1f14',
    name: 'Rallonge micromètre intérieur contrôle fourreau',
    location: '',
    status: 'OK',
    notes: ''
  },
  {
    hash: 'c949948a48ee25eb48760f31cbc3f7f2cd21ad44268f7651950aab5ecf0801ae',
    name: 'Pompe Enerpac',
    location: '',
    status: 'OK',
    notes: ''
  }
];

const initialTools: Tool[] = baseTools.map(t => ({
  ...t,
  updatedAt: new Date().toISOString()
}));

export function ToolProvider({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState<Tool[]>(initialTools);

  const updateTool = (hash: string, data: Partial<Tool>) => {
    setTools(prev =>
      prev.map(t =>
        t.hash === hash ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const addTool = (tool: Tool) => {
    setTools(prev => [
      ...prev,
      { ...tool, updatedAt: new Date().toISOString() }
    ]);
  };

  return (
    <ToolContext.Provider value={{ tools, updateTool, addTool }}>
      {children}
    </ToolContext.Provider>
  );
}

export function useTools() {
  const ctx = useContext(ToolContext);
  if (!ctx) throw new Error('useTools must be used within ToolProvider');
  return ctx;
}

interface Device {
  id: string
  name: string
  transistors: number
  storage: number[]
  ram: number[]
  gpu?: {
    transistors: number
    cores: number
  }
  cpu?: {
    transistors: number
    cores: number
  }
  display?: {
    transistors: number
  }
  battery?: {
    capacity: number
  }
  camera?: {
    pixels: number
  }
  price?: number
}

export const devices = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    transistors: 19000000000,
    storage: [256 * 1024 * 1024, 512 * 1024 * 1024, 1024 * 1024 * 1024],
    ram: [8 * 1024 * 1024, 16 * 1024 * 1024, 32 * 1024 * 1024],
    gpu: {
      transistors: 10000000000,
      cores: 100,
    },
    cpu: {
      transistors: 10000000000,
      cores: 100,
    },
    display: {
      transistors: 10000000000,
    },
    battery: {
      capacity: 3200,
    },
    camera: {
      pixels: 12000000,
    },
    price: 1000
  },
  {
    id: 'nvidia-a100',
    name: 'NVIDIA A100 GPU',
    transistors: 10000000000,
    gpu: {
      transistors: 10000000000,
      cores: 100,
    },
    price: 15000
  },
  {
    id: 'nvidia-h100',
    name: 'NVIDIA H100 GPU',  
    transistors: 140000000000,
    gpu: {
      transistors: 140000000000,
      cores: 100,
    },
    price: 30000
  },
  {
    id: 'macbook-pro-16-inch-2024',
    name: 'MacBook Pro 16-inch 2024',
    transistors: 12000000000,
    cpu: {
      transistors: 12000000000,
      cores: 100,
    },
    gpu: {
      transistors: 12000000000,
      cores: 100,
    },
    price: 20000  
  },
  {
    id: 'macbook-air-2024',
    name: 'MacBook Air 2024',
    transistors: 10000000000,
    cpu: {
      transistors: 10000000000,
      cores: 100,
    },
    gpu: {
      transistors: 10000000000,
      cores: 100,
    },  
    price: 10000
  },
  {
    id: 'iphone-15-pro-macbook-pro-16-inch-2024',
    name: 'iPhone 15 Pro vs MacBook Pro 16-inch 2024',  
    devices: ['iphone-15-pro', 'macbook-pro-16-inch-2024'],
    price: 100  
  },
  {
    id: 'iphone-15-pro-macbook-air-2024',
    name: 'iPhone 15 Pro vs MacBook Air 2024',
    devices: ['iphone-15-pro', 'macbook-air-2024'],
    price: 10000
  },
  {
    id: 'amd-epyc-rome',
    name: 'AMD EPYC Rome',
    transistors: 39000000000,
    cpu: {
      transistors: 39000000000,
      cores: 64,
    },
    price: 7000
  },
  {
    id: 'intel-xeon-ice-lake',
    name: 'Intel Xeon Ice Lake',
    transistors: 30000000000,
    cpu: {
      transistors: 30000000000,
      cores: 40,
    },
    price: 5000
  },
  {
    id: 'apple-m1',
    name: 'Apple M1',
    transistors: 16000000000,
    cpu: {
      transistors: 16000000000,
      cores: 8,
    },
    gpu: {
      transistors: 16000000000,
      cores: 8,
    },
    price: 2000
  },
  {
    id: 'qualcomm-snapdragon-888',
    name: 'Qualcomm Snapdragon 888',
    transistors: 10000000000,
    cpu: {
      transistors: 10000000000,
      cores: 8,
    },
    gpu: {
      transistors: 10000000000,
      cores: 1,
    },
    price: 1500
  },
  {
    id: 'nvidia-a100',
    name: 'NVIDIA A100',
    transistors: 54000000000,
    gpu: {
      transistors: 54000000000,
      cores: 6912,
    },
    price: 11000
  },
  {
    id: 'nvidia-tesla-v100',
    name: 'NVIDIA Tesla V100',
    transistors: 21000000000,
    gpu: {
      transistors: 21000000000,
      cores: 5120,
    },
    price: 8000
  },
  {
    id: 'amd-radeon-rx-6900-xt',
    name: 'AMD Radeon RX 6900 XT',
    transistors: 26800000000,
    gpu: {
      transistors: 26800000000,
      cores: 5120,
    },
    price: 1000
  },
  {
    id: 'intel-core-i9-10900k',
    name: 'Intel Core i9-10900K',
    transistors: 3000000000,
    cpu: {
      transistors: 3000000000,
      cores: 10,
    },
    price: 500
  },
  {
    id: 'amd-ryzen-9-5900x',
    name: 'AMD Ryzen 9 5900X',
    transistors: 4100000000,
    cpu: {
      transistors: 4100000000,
      cores: 12,
    },
    price: 550
  },
  {
    id: 'apple-a14-bionic',
    name: 'Apple A14 Bionic',
    transistors: 11800000000,
    cpu: {
      transistors: 11800000000,
      cores: 6,
    },
    price: 0 // Price not available
  },
  {
    id: 'apple-m1',
    name: 'Apple M1',
    transistors: 16000000000,
    cpu: {
      transistors: 16000000000,
      cores: 8,
    },
    price: 0 // Price not available
  },
  {
    id: 'nvidia-geforce-rtx-3090',
    name: 'NVIDIA GeForce RTX 3090',
    transistors: 28000000000,
    gpu: {
      transistors: 28000000000,
      cores: 10496,
    },
    price: 1499
  },
  {
    id: 'amd-ryzen-threadripper-3990x',
    name: 'AMD Ryzen Threadripper 3990X',
    transistors: 39600000000,
    cpu: {
      transistors: 39600000000,
      cores: 64,
    },
    price: 3990
  },
  {
    id: 'intel-4004',
    name: 'Intel 4004',
    transistors: 3000,
    cpu: {
      transistors: 3000,
      cores: 1,
    },
    price: 0 // Price not available
  },
  {
    id: 'intel-8080',
    name: 'Intel 8080',
    transistors: 6000,
    cpu: {
      transistors: 6000,
      cores: 1,
    },
    price: 0 // Price not available
  },
  {
    id: 'intel-8086',
    name: 'Intel 8086',
    transistors: 29000,
    cpu: {
      transistors: 29000,
      cores: 1,
    },
    price: 0 // Price not available
  },
  {
    id: 'intel-80386',
    name: 'Intel 80386',
    transistors: 275000,
    cpu: {
      transistors: 275000,
      cores: 1,
    },
    price: 0 // Price not available
  },
  {
    id: 'intel-pentium',
    name: 'Intel Pentium',
    transistors: 3100000,
    cpu: {
      transistors: 3100000,
      cores: 1,
    },
    price: 0 // Price not available
  },
{
    id: 'intel-core-i7',
    name: 'Intel Core i7',
    transistors: 731000000,
    cpu: {
      transistors: 731000000,
      cores: 4,
    },
    price: 0 // Price not available
  },
  {
    id: 'intel-core-i9',
    name: 'Intel Core i9',
    transistors: 1000000000,
    cpu: {
      transistors: 1000000000,
      cores: 8,
    },
    price: 0 // Price not available
  },
  {
    id: 'amd-ryzen-5',
    name: 'AMD Ryzen 5',
    transistors: 4800000000,
    cpu: {
      transistors: 4800000000,
      cores: 6,
    },
    price: 0 // Price not available
  },
  {
    id: 'amd-ryzen-7',
    name: 'AMD Ryzen 7',
    transistors: 4800000000,
    cpu: {
      transistors: 4800000000,
      cores: 8,
    },
    price: 0 // Price not available
  },
  {
    id: 'amd-ryzen-9',
    name: 'AMD Ryzen 9',
    transistors: 6800000000,
    cpu: {
      transistors: 6800000000,
      cores: 12,
    },
    price: 0 // Price not available
  }


] 
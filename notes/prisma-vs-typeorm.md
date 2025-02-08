### 1. Model vs Entity Karşılaştırması
Swift UIKit'teki model yapısı ile NestJS'teki entity yapısı benzer amaçlara hizmet eder, ancak bazı farklılıklar vardır:
Swift UIKit'te Model:

```swift
struct Message: Codable {
    let name: String
    let message: String
}
```

NestJS'te Entity:

```typescript
export class Message {
    name: string;
    message: string;
}

### 2. Temel Farklar ve Benzerlikler
Swift UIKit'te:
Modeller genellikle struct veya class olarak tanımlanır
Codable protokolü ile API'den gelen JSON'ı direkt olarak modele çevirebiliriz
Genellikle Models klasöründe tutulur
NestJS'te:
Entity'ler veritabanı tablolarını temsil eder
TypeORM, Prisma gibi ORM'ler ile kullanılır
entities klasöründe tutulur

### 3. NestJS Dosya Yapısı
NestJS'te tipik bir modül yapısı şöyledir:

```bash
src/
├── messages/
│   ├── entities/
│   │   └── message.entity.ts
│   ├── dto/
│   │   └── create-message.dto.ts
│   ├── messages.controller.ts
│   ├── messages.service.ts
│   └── messages.module.ts
```

Bu yapıyı Swift UIKit ile karşılaştıralım:

```bash
YourApp/
├── Models/
│   └── Message.swift
├── ViewModels/
│   └── MessageViewModel.swift
├── Views/
│   └── MessageView.swift
└── Services/
    └── MessageService.swift

### 4. ORM ve Entity İlişkisi
1. TypeORM kullanıldığında:

```typescript
@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    message: string;
}
```

2. Prisma kullanıldığında:

```prisma
model Message {
  id      Int      @id @default(autoincrement())
  name    String
  message String
}
```

Prisma kullanıldığında .entity.ts dosyalarına genellikle ihtiyaç duyulmaz, çünkü Prisma kendi tiplerini otomatik olarak oluşturur.

### 5. Service vs Entity
auth.service.ts dosyasında gördüğünüz tipler (AuthInput, SignInData) interface/type olarak tanımlanmış çünkü bunlar:
Geçici veri yapıları
Servis katmanında kullanılan veri transfer objeleri
Veritabanında saklanmayan yapılar
Entity'ler ise:
Veritabanı tablolarını temsil eder
Kalıcı veri yapılarıdır
ORM tarafından yönetilir

### 6. Başlangıç İçin Öneriler
Önce temel yapıyı anlamaya çalışın:
Controller: API endpoint'lerini yönetir (Swift'teki ViewController gibi düşünün)
Service: İş mantığını içerir (Swift'teki Service katmanı gibi)
Entity: Veritabanı modellerini temsil eder (Swift'teki Model gibi)
Basit bir CRUD işlemi ile başlayın:
Bir entity oluşturun
Bu entity için service yazın
Controller ile API endpoint'leri oluşturun
ORM seçimi:
Başlangıç için TypeORM daha anlaşılır olabilir
Prisma daha modern ve tip güvenli bir alternatif

### 7. Swift UIKit'ten Geçiş İçin İpuçları
Swift'teki Model = NestJS'te Entity
Swift'teki ViewModel = NestJS'te Service (kısmen)
Swift'teki NetworkService = NestJS'te Service
Swift'teki ViewController = NestJS'te Controller (benzer isim, farklı sorumluluk)
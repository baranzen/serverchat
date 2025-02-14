# DTO vs Entity - Başlangıç Seviyesi Rehber

## 1. Temel Tanımlar

### DTO (Data Transfer Object) Nedir?

- İstemci (client) ile sunucu (server) arasında veri taşıma amacıyla kullanılan basit nesnelerdir
- Örneğin: Bir form doldurduğunuzda, o formdaki verileri sunucuya gönderirken kullanılır
- Validasyon (doğrulama) kurallarını içerir

### Entity (Varlık) Nedir?

- Veritabanındaki tabloları temsil eden nesnelerdir
- Veritabanına kaydedilecek verilerin şablonudur
- Veritabanı ile ilgili işlemleri (ORM) içerir

## 2. Basit Bir Örnek

Bir chat uygulamasında mesaj gönderme senaryosu:

### DTO Örneği (create-message.dto.ts):

```typescript
export class CreateMessageDto {
export class CreateMessageDto {
@IsNotEmpty() // Boş olmamalı
@MinLength(2) // En az 2 karakter olmalı
message: string;
}
```

### Entity Örneği (message.entity.ts):

```typescript
export class Message {
id: number; // Veritabanındaki benzersiz kimlik
message: string; // Mesaj içeriği
sender: string; // Gönderen kişi
createdAt: Date; // Mesajın oluşturulma tarihi
}
```

## 3. Neden İkisine de İhtiyaç Var?

### DTO'nun Görevleri:

1. **Veri Doğrulama**:
   - Mesajın boş olmamasını kontrol eder
   - Mesajın minimum uzunluğunu kontrol eder
2. **Veri Filtreleme**:
   - Sadece gerekli verileri alır
   - Güvenlik için fazla bilgileri engeller

### Entity'nin Görevleri:

1. **Veritabanı Temsili**:

   - Veritabanı tablosunun yapısını gösterir
   - Veritabanı işlemleri için gerekli bilgileri içerir

2. **Veri Saklama**:
   - id, oluşturulma tarihi gibi sistem verilerini içerir
   - Veritabanında saklanacak tüm alanları tanımlar

## 4. Gerçek Hayattan Bir Örnek

Bir kafe siparişi düşünelim:

### DTO - Sipariş Formu:

- Müşterinin doldurduğu form
- Sadece gerekli bilgiler:
  - İçecek adı
  - Boyut (küçük/orta/büyük)
  - Özel istekler

### Entity - Sipariş Kaydı:

- Sistemde saklanan sipariş
- Tüm detaylar:
  - Sipariş numarası (ID)
  - İçecek bilgileri
  - Fiyat
  - Sipariş tarihi
  - Hazırlayan personel
  - Durum (hazırlanıyor/hazır/teslim edildi)

## 5. Özet

- **DTO**: İstemciden gelen verileri kontrol eder ve taşır
- **Entity**: Veritabanında saklanacak verileri temsil eder

Bu ayrım sayesinde:

- Daha güvenli bir uygulama
- Daha düzenli kod
- Daha kolay bakım
- Daha iyi hata yönetimi

sağlanmış olur.

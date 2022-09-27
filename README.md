
# Todolist-advanced

Tarayıcıların sahip olduğu "localStorage" özelliği ile birlikte çalışan gelişmiş özelliklere sahip Todolist uygulaması. 

[![bootstrap](https://img.shields.io/badge/poweredBy-iyikod.com-66CC00)](https://www.iyikod.com)


## Kullanılan Frameworkler ve Kütüphaneler


[![bootstrap](https://img.shields.io/badge/Bootstrap-v5.1.3-7952b3)](https://getbootstrap.com/docs/5.1/getting-started/introduction/)

[![bootstrap icons](https://img.shields.io/badge/BootstrapIcons-v1.8.3-7952b3)](https://icons.getbootstrap.com/)

[![jquery](https://img.shields.io/badge/Jquery-v3.6.0-0769ad)](https://www.jsdelivr.com/package/npm/jquery)

  
## Özellikler

- Responsive tasarım
- Sınızsız yapılacak listesi ekleme (localStorage kapasitesi kadar)
- Yapılacak listelerine sınırsız madde ekleme (localStorage kapasitesi kadar)
- Maddelleri onaylama, görüntüleme, düzenleme ve silme
- Toplu bir şekilde listeleri ve maddelleri silme
- Listeleri ve maddelerini dışa aktarma (JSON formatında)
- Listeleri ve maddelerini içe aktarma (JSON formatında)
- Dil seçeneği (Türkçe ve İngilizce)


## Tanıtım Videosu
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/EAlKtXqP90Y/0.jpg)](https://www.youtube.com/watch?v=EAlKtXqP90Y)

  
## Örnek JSON Formatı (İçe Aktarma işlem için)

```
[
  {
    "name": "Liste1",
    "todos": [
      {
        "value": "Madde1",
        "status": true
      },
      {
        "value": "Madde2",
        "status": false
      },
      {
        "value": "Madde3",
        "status": true
      },
      {
        "value": "Madde4",
        "status": false
      }
    ]
  },
  {
    "name": "Liste2",
    "todos": [
      {
        "value": "Madde1",
        "status": true
      }
    ]
  },
  {
    "name": "Liste3",
    "todos": [
      {
        "value": "Madde1",
        "status": false
      },
      {
        "value": "Madde2",
        "status": false
      },
      {
        "value": "Madde3",
        "status": true
      }
    ]
  }
]
```

  
## Lisans

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://choosealicense.com/licenses/mit/)

import React from "react";
import BackArrow from "./BackArrow";

export default function TermsOfUse() {
  return (
    <>
    <BackArrow url={"/"}/>
    <div style={{
      maxWidth: "900px",
      margin: "48px auto 24px auto",
      padding: "32px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 24px rgba(16,185,129,0.09)"
    }}>
      <h1 style={{ color: "#059669", fontWeight: 700, fontSize: "2.2rem" }}>
        İstifadə Şərtləri və Məxfi̇li̇k Si̇yasəti̇
      </h1>
      <p style={{color: "#444", marginBottom: 40}}>
        Son yenilənmə tarixi: 21 Avqust 2025
      </p>

      <h2 style={{color: "#059669", fontWeight: 600}}>1. Giriş</h2>
      <p>
        Bu səhifə “İstifadə Şərtləri” və “Məxfi̇li̇k Si̇yasəti̇”ni özündə birləşdirir və bu platformadan istifadə zamanı sizi məlumatlandırır. 
        Sayta daxil olaraq və ya qeydiyyatdan keçərək aşağıdakı şərtlərlə razılaşmış olursunuz.
      </p>

      <h2 style={{color: "#059669", fontWeight: 600}}>2. Platformanın Rolu və Məsuliyyəti</h2>
      <ul>
        <li>Platforma yalnız istifadəçilər arasında elanların yerləşdirilməsi və əlaqə yaradılması üçün vasitəçi rolunu oynayır.</li>
        <li>Platforma heç bir halda istifadəçilər arasında bağlanan razılaşmalar, ödənişlər, fırıldaqçılıq, maddi və ya mənəvi ziyanlara görə məsuliyyət daşımır.</li>
        <li>Elanların düzgünlüyünə, aktuallığına və təhlükəsizliyinə görə yalnız elan sahibi məsuliyyət daşıyır.</li>
        <li>Platforma istifadəçi şikayətləri və ya şübhəli fəaliyyət barədə daxil olan məlumatları araşdırmaq və zəruri hallarda elan və profili silmək hüququnu özündə saxlayır.</li>
      </ul>

      <h2 style={{color: "#059669", fontWeight: 600}}>3. İstifadəçi Öhdəlikləri</h2>
      <ul>
        <li>İstifadəçilər yalnız doğru və tam məlumat təqdim etməyə borcludur.</li>
        <li>İstifadəçi qarşı tərəflə əlaqə saxlayarkən və razılaşma əldə edərkən ehtiyatlı olmalıdır.</li>
        <li>Hər hansı bir ödəniş və ya şəxsi məlumat paylaşımı istifadəçinin öz məsuliyyəti altındadır.</li>
        <li>Platformada qanunsuz və ya etik olmayan fəaliyyətlər qadağandır.</li>
      </ul>

      <h2 style={{color: "#059669", fontWeight: 600}}>4. Məxfi̇li̇k Si̇yasəti̇ və Şəxsi Məlumatlar</h2>
      <ul>
        <li>
          Platforma istifadəçilərdən yalnız xidmətin işləməsi üçün zəruri olan şəxsi məlumatları (ad, email, telefon və s.) toplayır.
        </li>
        <li>
          Toplanan məlumatlar üçüncü şəxslərə ötürülmür (qanunla tələb olunan hallar istisna olmaqla).
        </li>
        <li>
          İstifadəçi istədiyi zaman hesabını və şəxsi məlumatlarını silmək hüququna malikdir.
        </li>
        <li>
          Məlumatların təhlükəsizliyi üçün tədbirlər görülür, lakin internet üzərindən ötürülən məlumatların tam təhlükəsizliyinə zəmanət verilmir.
        </li>
      </ul>

      <h2 style={{color: "#059669", fontWeight: 600}}>5. Cookie-lər və İzləmə Texnologiyaları</h2>
      <ul>
        <li>
          Platforma istifadə təcrübəsinin yaxşılaşdırılması üçün cookie və oxşar texnologiyalardan istifadə edə bilər.
        </li>
        <li>
          Cookie-lərdən istifadə barədə daha ətraflı məlumat üçün <a href="/cookiepolicy" style={{color:"#059669", textDecoration:"underline"}}>cookie siyasəti</a> səhifəmizə baxa bilərsiniz.
        </li>
      </ul>

      <h2 style={{color: "#059669", fontWeight: 600}}>6. Şərtlərin Dəyişdirilməsi</h2>
      <ul>
        <li>
          Platforma istənilən vaxt bu şərtləri dəyişmək hüququna malikdir.
        </li>
        <li>
          Dəyişikliklər saytda dərc olunduğu andan qüvvəyə minir.
        </li>
        <li>
          İstifadəçi dəyişiklikləri izləməyə və yeni şərtlərlə razılaşmağa borcludur.
        </li>
      </ul>

      <h2 style={{color: "#059669", fontWeight: 600}}>7. Hüquqi Qeyd və Mübahisələrin Həlli</h2>
      <ul>
        <li>
          Platformada yerləşdirilən heç bir məlumat, məsləhət və ya elan saytın təsdiqi və ya zəmanəti deyil.
        </li>
        <li>
          Platformadan istifadə edən hər bir şəxs bu şərtlərlə razılaşır və onların pozulmasına görə məsuliyyət daşıyır.
        </li>
        <li>
          İstifadəçilər arasında yaranan mübahisələr birbaşa tərəflər arasında həll edilir. Zəruri hallarda mübahisələr Azərbaycan Respublikasının qanunvericiliyinə uyğun həll olunur.
        </li>
      </ul>

      <h2 style={{color: "#059669", fontWeight: 600}}>8. Yaş Məhdudiyyəti</h2>
      <ul>
        <li>
          Saytdan yalnız 18 yaşdan yuxarı şəxslər istifadə edə bilər.
        </li>
      </ul>
      
      <p style={{marginTop: 48, color: "#666", fontSize: "1.1rem"}}>
        Platformadan istifadə etməklə yuxarıda qeyd olunan bütün şərtləri və məxfi̇li̇k siyasətini qəbul etmiş sayılırsınız.
      </p>
    </div>
    </>
  );
}
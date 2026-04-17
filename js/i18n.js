window.VMI18n = (() => {
  const messages = {
    fr: {
      'common.save':'Enregistrer',
      'common.edit':'Modifier',
      'common.open':'Ouvrir',
      'common.back':'Retour',
      'common.premium':'Premium',
      'common.female':'Femme',
      'common.male':'Homme',
      'common.other':'Autre',
      'nav.home':'Accueil',
      'nav.journal':'Journal',
      'nav.profile':'Profil',
      'nav.vault':'Coffre',
      'nav.shop':'Boutique',
      'nav.settings':'Réglages',
      'lock.title':'Espace protégé',
      'lock.subtitle':'Entrez votre code pour ouvrir Vmyself.',
      'lock.pinPlaceholder':'Code à 4 chiffres',
      'lock.unlock':'Déverrouiller',
      'lock.forgot':'Code oublié',
      'lock.answerPlaceholder':'Votre réponse',
      'lock.recover':'Vérifier ma réponse',
      'onboarding.eyebrow':'Bienvenue',
      'onboarding.title':'Créons ton espace bien-être',
      'onboarding.name':'Prénom',
      'onboarding.age':'Âge',
      'onboarding.sex':'Sexe',
      'onboarding.goal':'Objectif principal',
      'onboarding.height':'Taille (cm)',
      'onboarding.weight':'Poids actuel (kg)',
      'onboarding.why':'Quels sont vos objectifs ?',
      'onboarding.pin':'Code de l’app',
      'onboarding.question':'Question de secours',
      'onboarding.answer':'Réponse de secours',
      'onboarding.save':'Créer mon espace',
      'goals.confidence':'Confiance en soi',
      'goals.health':'Santé',
      'goals.energy':'Énergie',
      'goals.wellbeing':'Mieux-être global',
      'home.title':'Ton suivi, avec douceur',
      'home.crack':'J’ai craqué',
      'home.logToday':'Noter ma journée',
      'home.sectionHealth':'Vue santé',
      'home.todayHealth':'Mes repères du moment',
      'home.sectionStatus':'Couleur du jour',
      'home.dayColorTitle':'Mon état du jour',
      'home.sectionWins':'Coffre-fort',
      'home.vaultTitle':'Mes petites victoires',
      'home.sectionActions':'Accès rapide',
      'home.quickActions':'Actions utiles',
      'metrics.weight':'Poids',
      'metrics.bmi':'IMC',
      'metrics.waistHeight':'Tour/taille',
      'metrics.caloriesDay':'Calories du jour',
      'metrics.water':'Eau',
      'metrics.sleep':'Sommeil',
      'profile.title':'Profil et mesures',
      'profile.personalEyebrow':'Identité',
      'profile.personalTitle':'Tes informations personnelles',
      'profile.bodyEyebrow':'Mesures',
      'profile.bodyTitle':'Corps et objectifs',
      'profile.targetWeight':'Poids objectif (kg)',
      'profile.waist':'Tour de taille (cm)',
      'profile.dailyTarget':'Cible journalière',
      'profile.dailyTargetHelp':'Estimation locale simple',
      'profile.securityEyebrow':'Sécurité',
      'profile.securityTitle':'Code et récupération',
      'journal.title':'Journal quotidien',
      'journal.dayEyebrow':'Aujourd’hui',
      'journal.dayTitle':'Hydratation, sommeil et ressenti',
      'journal.water':'Eau bue (L)',
      'journal.sleep':'Sommeil (heures)',
      'journal.foodEyebrow':'Alimentation',
      'journal.foodTitle':'Ce que j’ai mangé',
      'journal.foodName':'Ex. salade poulet',
      'journal.foodCalories':'Calories',
      'journal.addMeal':'Ajouter',
      'journal.mealsCount':'Repas notés',
      'journal.weightEyebrow':'Suivi',
      'journal.weightTitle':'Poids et note du jour',
      'journal.mood':'Couleur du jour',
      'journal.note':'Note personnelle',
      'vault.title':'Coffre des victoires',
      'vault.eyebrow':'Ressources',
      'vault.subtitle':'Tout ce qui prouve que tu avances',
      'vault.placeholder':'Ex. j’ai bu assez d’eau aujourd’hui',
      'vault.add':'Ajouter',
      'shop.title':'Boutique',
      'shop.premiumEyebrow':'Version complète',
      'shop.premiumTitle':'Débloquer Vmyself Premium',
      'shop.premiumName':'Vmyself Premium',
      'shop.premiumDesc':'Historique enrichi, conseils avancés, rappels et analyse plus fine.',
      'shop.buyPremium':'Activer Premium',
      'shop.feature1':'Conseils enrichis sur les jours difficiles',
      'shop.feature2':'Statistiques détaillées et vue hebdo',
      'shop.feature3':'Messages premium plus personnalisés',
      'shop.adsEyebrow':'Confort',
      'shop.adsTitle':'Moins d’interruptions',
      'shop.removeAds':'Retirer les pubs',
      'shop.removeAdsDesc':'Simulé en local pour préparer l’intégration store.',
      'shop.buyNoAds':'Acheter sans pub',
      'settings.title':'Réglages',
      'settings.privacyEyebrow':'Confidentialité',
      'settings.privacyTitle':'Protéger tes données',
      'settings.hideSensitive':'Masquer les données sensibles',
      'settings.hideSensitiveDesc':'Floute le poids, l’IMC et les chiffres personnels.',
      'settings.lockOnOpen':'Verrou au lancement',
      'settings.lockOnOpenDesc':'Demande le code à chaque ouverture de l’app.',
      'settings.langEyebrow':'Langue',
      'settings.langTitle':'Langue de l’interface',
      'settings.dataEyebrow':'Données',
      'settings.dataTitle':'Sauvegarde locale',
      'settings.export':'Exporter mes données',
      'settings.reset':'Réinitialiser',
      'settings.pin':'Code PIN',
      'status.greenDark':'Vert foncé',
      'status.greenLight':'Vert clair',
      'status.yellow':'Jaune',
      'status.orange':'Orange',
      'status.red':'Rouge',
      'crack.eyebrow':'Respire',
      'crack.title':'Tu n’as pas tout gâché',
      'crack.saveVictory':'Sauver une mini-victoire',
      'crack.ok':'Revenir doucement',
      'ads.banner':'Espace pub local',
      'ads.interstitial':'Pause sponsor locale',
      'toast.saved':'C’est enregistré.',
      'toast.premium':'Premium activé en local.',
      'toast.noAds':'Mode sans pub activé en local.',
      'toast.exported':'Export JSON téléchargé.',
      'toast.reset':'Les données locales ont été réinitialisées.'
    },
    en: {
      'common.save':'Save','common.edit':'Edit','common.open':'Open','common.back':'Back','common.premium':'Premium',
      'common.female':'Female','common.male':'Male','common.other':'Other',
      'nav.home':'Home','nav.journal':'Journal','nav.profile':'Profile','nav.vault':'Vault','nav.shop':'Shop','nav.settings':'Settings',
      'lock.title':'Protected space','lock.subtitle':'Enter your code to open Vmyself.','lock.pinPlaceholder':'4-digit code','lock.unlock':'Unlock','lock.forgot':'Forgot code','lock.answerPlaceholder':'Your answer','lock.recover':'Check my answer',
      'onboarding.eyebrow':'Welcome','onboarding.title':'Let’s create your wellness space','onboarding.name':'First name','onboarding.age':'Age','onboarding.sex':'Sex','onboarding.goal':'Main goal','onboarding.height':'Height (cm)','onboarding.weight':'Current weight (kg)','onboarding.why':'Why do you want to move forward?','onboarding.pin':'App code','onboarding.question':'Recovery question','onboarding.answer':'Recovery answer','onboarding.save':'Create my space',
      'goals.confidence':'Confidence','goals.health':'Health','goals.energy':'Energy','goals.wellbeing':'Overall wellbeing',
      'home.title':'Your progress, with kindness','home.crack':'I slipped','home.logToday':'Log today','home.sectionHealth':'Health view','home.todayHealth':'My current markers','home.sectionStatus':'Day color','home.dayColorTitle':'My state today','home.sectionWins':'Vault','home.vaultTitle':'My small wins','home.sectionActions':'Quick access','home.quickActions':'Helpful actions',
      'metrics.weight':'Weight','metrics.bmi':'BMI','metrics.waistHeight':'Waist/height','metrics.caloriesDay':'Calories today','metrics.water':'Water','metrics.sleep':'Sleep',
      'profile.title':'Profile and measurements','profile.personalEyebrow':'Identity','profile.personalTitle':'Your personal information','profile.bodyEyebrow':'Measurements','profile.bodyTitle':'Body and goals','profile.targetWeight':'Target weight (kg)','profile.waist':'Waist circumference (cm)','profile.dailyTarget':'Daily target','profile.dailyTargetHelp':'Simple local estimate','profile.securityEyebrow':'Security','profile.securityTitle':'Code and recovery',
      'journal.title':'Daily journal','journal.dayEyebrow':'Today','journal.dayTitle':'Hydration, sleep and feelings','journal.water':'Water (L)','journal.sleep':'Sleep (hours)','journal.foodEyebrow':'Food','journal.foodTitle':'What I ate','journal.foodName':'Ex. chicken salad','journal.foodCalories':'Calories','journal.addMeal':'Add','journal.mealsCount':'Meals logged','journal.weightEyebrow':'Tracking','journal.weightTitle':'Weight and note of the day','journal.mood':'Day color','journal.note':'Personal note',
      'vault.title':'Victory vault','vault.eyebrow':'Resources','vault.subtitle':'Everything that proves you are moving forward','vault.placeholder':'Ex. I drank enough water today','vault.add':'Add',
      'shop.title':'Shop','shop.premiumEyebrow':'Full version','shop.premiumTitle':'Unlock Vmyself Premium','shop.premiumName':'Vmyself Premium','shop.premiumDesc':'Richer history, advanced advice, reminders and deeper analysis.','shop.buyPremium':'Enable Premium','shop.feature1':'Stronger advice on difficult days','shop.feature2':'Detailed stats and weekly view','shop.feature3':'More personalized premium messages','shop.adsEyebrow':'Comfort','shop.adsTitle':'Fewer interruptions','shop.removeAds':'Remove ads','shop.removeAdsDesc':'Simulated locally to prepare store integration.','shop.buyNoAds':'Buy no ads',
      'settings.title':'Settings','settings.privacyEyebrow':'Privacy','settings.privacyTitle':'Protect your data','settings.hideSensitive':'Hide sensitive data','settings.hideSensitiveDesc':'Blurs weight, BMI and personal figures.','settings.lockOnOpen':'Lock on launch','settings.lockOnOpenDesc':'Ask for the code each time the app opens.','settings.langEyebrow':'Language','settings.langTitle':'Interface language','settings.dataEyebrow':'Data','settings.dataTitle':'Local backup','settings.export':'Export my data','settings.reset':'Reset','settings.pin':'PIN code',
      'status.greenDark':'Dark green','status.greenLight':'Light green','status.yellow':'Yellow','status.orange':'Orange','status.red':'Red',
      'crack.eyebrow':'Breathe','crack.title':'You did not ruin everything','crack.saveVictory':'Save a tiny win','crack.ok':'Come back gently',
      'ads.banner':'Local ad space','ads.interstitial':'Local sponsor pause','toast.saved':'Saved.','toast.premium':'Premium enabled locally.','toast.noAds':'No-ads mode enabled locally.','toast.exported':'JSON export downloaded.','toast.reset':'Local data was reset.'
    }
  };

  const recoveryQuestions = {
    pet: { fr:'Quel est le prénom d’un animal qui compte pour toi ?', en:'What is the name of a pet that matters to you?' },
    place: { fr:'Quel lieu te rassure ou te fait du bien ?', en:'Which place makes you feel safe or good?' },
    person: { fr:'Quel prénom te réconforte ?', en:'Which first name comforts you?' }
  };

  const languages = [
    { code:'fr', label:'Français' },
    { code:'en', label:'English' }
  ];

  function getLanguage(){
    return (window.VMStorage?.read()?.settings?.language) || 'fr';
  }

  function t(key){
    const lang = getLanguage();
    return messages[lang]?.[key] ?? messages.fr?.[key] ?? key;
  }

  function apply(root = document){
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
    });
  }

  function getRecoveryQuestionLabel(key){
    const lang = getLanguage();
    return recoveryQuestions[key]?.[lang] || recoveryQuestions.pet[lang];
  }

  return { messages, languages, recoveryQuestions, getLanguage, t, apply, getRecoveryQuestionLabel };
})();

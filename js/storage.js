window.VMStorage = (() => {
  const KEY = 'vmyself.local.v1';

  const baseState = {
    settings: {
      language: 'fr',
      hideSensitive: false,
      lockOnOpen: false,
      premium: false,
      noAds: false
    },
    profile: {
      name: '',
      age: '',
      sex: 'female',
      goal: 'health',
      goals: ['health'],
      why: '',
      heightCm: '',
      weightKg: '',
      targetWeightKg: '',
      waistCm: '',
      pin: '',
      recoveryQuestionKey: 'pet',
      recoveryAnswer: ''
    },
    journal: {},
    victories: [],
    meta: {
      onboarded: false
    }
  };

  function clone(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  function read(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return clone(baseState);
      const parsed = JSON.parse(raw);
      return deepMerge(clone(baseState), parsed);
    }catch{
      return clone(baseState);
    }
  }

  function write(next){
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }

  function update(mutator){
    const current = read();
    const next = mutator(current) || current;
    write(next);
    return next;
  }

  function deepMerge(target, source){
    Object.keys(source || {}).forEach((key) => {
      const src = source[key];
      if(src && typeof src === 'object' && !Array.isArray(src)){
        target[key] = deepMerge(target[key] && typeof target[key] === 'object' ? target[key] : {}, src);
      }else{
        target[key] = src;
      }
    });
    return target;
  }

  function reset(){
    localStorage.removeItem(KEY);
    return clone(baseState);
  }

  return { KEY, baseState, read, write, update, reset, clone };
})();
class AbrigoAnimais {

  constructor() {
      // Mapeamento dos animais, seus tipos e brinquedos favoritos em ordem.
      this.animais = {
          'REX': { especie: 'cão', brinquedos: ['RATO', 'BOLA'] },
          'MIMI': { especie: 'gato', brinquedos: ['BOLA', 'LASER'] },
          'FOFO': { especie: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
          'ZERO': { especie: 'gato', brinquedos: ['RATO', 'BOLA'] },
          'BOLA': { especie: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
          'BEBE': { especie: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
          'LOCO': { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
      };
  }

  // Formata um nome de animal para ter a primeira letra maiúscula e o resto minúsculo.
  _formatarNomeAnimal(nome) {
      if (!nome) return '';
      return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
  }

  // Verifica se uma pessoa tem os brinquedos de um animal na ordem correta.
  _possuiBrinquedosNaOrdem(brinquedosPessoa, brinquedosAnimal) {
      let indiceBrinquedoAnimal = 0;
      for (const brinquedoPessoa of brinquedosPessoa) {
          if (brinquedoPessoa === brinquedosAnimal[indiceBrinquedoAnimal]) {
              indiceBrinquedoAnimal++;
          }
          if (indiceBrinquedoAnimal === brinquedosAnimal.length) {
              return true;
          }
      }
      return false;
  }

  // Verifica se uma pessoa tem todos os brinquedos de um animal.
  _possuiBrinquedosSemOrdem(brinquedosPessoa, brinquedosAnimal) {
      const setBrinquedosPessoa = new Set(brinquedosPessoa);
      return brinquedosAnimal.every(b => setBrinquedosPessoa.has(b));
  }

  encontraPessoas(brinquedosPessoa1Str, brinquedosPessoa2Str, ordemAnimaisStr) {
      // 1. VALIDAÇÃO DAS ENTRADAS
      const brinquedosPessoa1 = brinquedosPessoa1Str.toUpperCase().split(',').map(s => s.trim());
      const brinquedosPessoa2 = brinquedosPessoa2Str.toUpperCase().split(',').map(s => s.trim());
      const animaisConsiderados = ordemAnimaisStr.toUpperCase().split(',').map(s => s.trim());

      if (new Set(brinquedosPessoa1).size !== brinquedosPessoa1.length || new Set(brinquedosPessoa2).size !== brinquedosPessoa2.length) {
          return { erro: 'Brinquedo inválido' };
      }

      if (new Set(animaisConsiderados).size !== animaisConsiderados.length) {
          return { erro: 'Animal inválido' };
      }
      for (const animal of animaisConsiderados) {
          if (!this.animais[animal]) {
              return { erro: 'Animal inválido' };
          }
      }

      // 2. LÓGICA DE ADOÇÃO
      const adocoesPessoa1 = [];
      const adocoesPessoa2 = [];
      const resultado = [];

      const animaisNormais = animaisConsiderados.filter(a => a !== 'LOCO');
      
      for (const nomeAnimal of animaisNormais) {
          const animal = this.animais[nomeAnimal];
          const nomeFormatado = this._formatarNomeAnimal(nomeAnimal);
          
          let pessoa1PodeAdotar = this._possuiBrinquedosNaOrdem(brinquedosPessoa1, animal.brinquedos) && adocoesPessoa1.length < 3;
          let pessoa2PodeAdotar = this._possuiBrinquedosNaOrdem(brinquedosPessoa2, animal.brinquedos) && adocoesPessoa2.length < 3;

          if (pessoa1PodeAdotar && pessoa2PodeAdotar) {
              resultado.push(`${nomeFormatado} - abrigo`);
          } else if (pessoa1PodeAdotar) {
              adocoesPessoa1.push(nomeAnimal);
              resultado.push(`${nomeFormatado} - pessoa 1`);
          } else if (pessoa2PodeAdotar) {
              adocoesPessoa2.push(nomeAnimal);
              resultado.push(`${nomeFormatado} - pessoa 2`);
          } else {
              resultado.push(`${nomeFormatado} - abrigo`);
          }
      }
      
      // 3. CASO ESPECIAL DO LOCO
      if (animaisConsiderados.includes('LOCO')) {
          const animalLoco = this.animais['LOCO'];
          const nomeFormatado = this._formatarNomeAnimal('LOCO');
          
          let pessoa1PodeAdotarLoco = 
              this._possuiBrinquedosSemOrdem(brinquedosPessoa1, animalLoco.brinquedos) &&
              adocoesPessoa1.length < 3 &&
              adocoesPessoa1.length > 0;

          let pessoa2PodeAdotarLoco = 
              this._possuiBrinquedosSemOrdem(brinquedosPessoa2, animalLoco.brinquedos) &&
              adocoesPessoa2.length < 3 &&
              adocoesPessoa2.length > 0;

          if (pessoa1PodeAdotarLoco && pessoa2PodeAdotarLoco) {
              resultado.push(`${nomeFormatado} - abrigo`);
          } else if (pessoa1PodeAdotarLoco) {
              adocoesPessoa1.push('LOCO');
              resultado.push(`${nomeFormatado} - pessoa 1`);
          } else if (pessoa2PodeAdotarLoco) {
              adocoesPessoa2.push('LOCO');
              resultado.push(`${nomeFormatado} - pessoa 2`);
          } else {
              resultado.push(`${nomeFormatado} - abrigo`);
          }
      }

      // 4. FORMATAÇÃO DA SAÍDA
      resultado.sort();
      return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
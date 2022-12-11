import styled from 'styled-components/native';

import BancoBrasilSvg from '../assets/banco-brasil-logo.svg';
import BradescoSvg from '../assets/bradesco-logo.svg';
import CaixaEconomicaSvg from '../assets/cef-logo.svg';
import ItauSvg from '../assets/itau-logo.svg';
import NubankSvg from '../assets/nubank-logo.svg';
import SantanderSvg from '../assets/santander-logo.svg';

const BancoBrasilLogo = styled(BancoBrasilSvg);
const BradescoLogo = styled(BradescoSvg);
const CaixaEconomicaLogo = styled(CaixaEconomicaSvg);
const ItauLogo = styled(ItauSvg);
const NubankLogo = styled(NubankSvg);
const SantanderLogo = styled(SantanderSvg);

export function getBankLogo(bankId: number) {
  switch (bankId) {
    case 211:
      return BancoBrasilLogo;
  
    case 203:
      return BradescoLogo;

    case 219:
      return CaixaEconomicaLogo;

    case 201:
      return ItauLogo;

    case 212:
      return NubankLogo;

    case 208:
      return SantanderLogo;
  }
}

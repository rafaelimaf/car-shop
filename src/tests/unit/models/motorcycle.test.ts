import { Model } from 'mongoose';
import * as sinon from 'sinon';
import { expect } from 'chai'
import { allMotorcyclesMockWithId, motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMocks';
import Motorcycle from '../../../models/Motorcycle';

const motorcycleModel = new Motorcycle()

describe('Testa a model Motorcycle', () => {
  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId)
    sinon.stub(Model, 'find')
      .onCall(0).resolves(allMotorcyclesMockWithId)
      .onCall(1).resolves([])
    sinon.stub(Model, 'findById')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
  })

  after(() => {
    sinon.stub()
  })

  describe('quando é criado uma nova moto', async () => {
    it('com sucesso, é retornado o documento criado', async () => {
      const sut = await motorcycleModel.create(motorcycleMock)

      expect(sut).to.be.equal(motorcycleMockWithId)
    });
  });

  describe('quando forem listadas todas as motos cadastradas', () => {
    it('com sucesso, e há motos cadastradas, é retornado um array com os documentos', async () => {
      const sut = await motorcycleModel.read()

      expect(sut).to.be.an('array')
      expect(sut).to.not.be.empty
    })

    it('com sucesso, mas não há nenhuma moto cadastrada, é tornado um array vazio', async () => {
      const sut = await motorcycleModel.read()

      expect(sut).to.be.an('array')
      expect(sut).to.be.empty
    })
  });

  describe('quando é pesquisado uma moto específica', () => {
    it('com sucesso, e a moto está cadastrada no banco, é retornado o documento pesquisado', async () => {
      const sut = await motorcycleModel.readOne('4edd40c86762e0fb12000003')

      expect(sut).to.be.equal(motorcycleMockWithId)
    });

    it('com sucesso, mas a moto não está cadastrada no banco, é retornado null', async () => {
      const sut = await motorcycleModel.readOne('4edd40c86762e0fb12000003')

      expect(sut).to.be.equal(null)
    });
  });
});
/* eslint-disable no-use-before-define */
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'
import { uniqueId } from 'src/common/helpers/uuidHelper'
import { ISample } from '../types'

class SampleModel extends Model<InferAttributes<SampleModel>, InferCreationAttributes<SampleModel>> implements ISample {
  declare id: CreationOptional<number>
  declare uuid: CreationOptional<string>
  declare email: string
  declare name: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

export default function (sequelize: Sequelize) {
  SampleModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: () => {
          return uniqueId()
        }
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Sample',
      tableName: 'samples',
      timestamps: true,
      freezeTableName: true
    }
  )

  return SampleModel
}

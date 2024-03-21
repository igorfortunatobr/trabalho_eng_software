-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_engsoftware
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_engsoftware
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_engsoftware` DEFAULT CHARACTER SET utf8 ;
USE `bd_engsoftware` ;

-- -----------------------------------------------------
-- Table `bd_engsoftware`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_engsoftware`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `senha` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_engsoftware`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_engsoftware`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_engsoftware`.`transacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_engsoftware`.`transacao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `data` DATETIME NOT NULL,
  `valor` DOUBLE(15,2) NOT NULL,
  PRIMARY KEY (`id`, `idUsuario`),
  INDEX `fk_transacao_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_transacao_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `bd_engsoftware`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_engsoftware`.`categoriaTransacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_engsoftware`.`categoriaTransacao` (
  `idCategoria` INT NOT NULL,
  `idTransacao` INT NOT NULL,
  `valor` DOUBLE(15,2) NOT NULL,
  PRIMARY KEY (`idCategoria`, `idTransacao`),
  INDEX `fk_categoriaTransacao_has_transacao_transacao1_idx` (`idTransacao` ASC) VISIBLE,
  INDEX `fk_categoriaTransacao_has_transacao_categoriaTransacao_idx` (`idCategoria` ASC) VISIBLE,
  CONSTRAINT `fk_categoriaTransacao_has_transacao_categoriaTransacao`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `bd_engsoftware`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categoriaTransacao_has_transacao_transacao1`
    FOREIGN KEY (`idTransacao`)
    REFERENCES `bd_engsoftware`.`transacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

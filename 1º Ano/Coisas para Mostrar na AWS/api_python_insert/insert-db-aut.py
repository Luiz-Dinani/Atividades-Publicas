import psutil
import time
from connectdb import *
import ssl

ssl._create_default_https_context = ssl._create_unverified_context


def alertaCPU(percCpu, maq):
    print(percCpu)

    if percCpu > 30:
        print("alerta CPU")
    elif percCpu > 50:
        print("alerta CPU2")
    elif percCpu > 70:
        print("alerta CPU3")


def alertaRAM(percCpu, maq):

    if percCpu > 30:
        print("alerta ram1")
    elif percCpu > 50:
        print("alerta ram2")
    elif percCpu > 70:
        print("alerta ram3")


def alertaDisco(percCpu, maq):
    print(percCpu)
    if percCpu > 30:
        print("alerta disco")
    elif percCpu > 50:
        print("alerta disco2")
    elif percCpu > 70:
        print("alerta disco3")


def exibicaoPercentualProcessador(maq, percCpu):
    print("----------------------------------------------")
    print(f'Percentual do processador da máquina {maq}:')
    print(f"CPU: {percCpu:.2f}%")
    print("----------------------------------------------")


def exibicaoMemoria(maq, percentual):
    print("----------------------------------------------")
    print(f'Dados da memória do dispositivo {maq}:')
    print(f"% de uso: {percentual:.2f} %\n")
    print("----------------------------------------------")


def exibirDisco(maq, percentual):
    print("----------------------------------------------")
    print(f'Dados do seu disco rígido na máquina {maq}:')
    print(f"% de uso: {percentual:.2f} %\n")
    print("----------------------------------------------")


perguntaNome = input("Olá. Bem-vindo! Qual o seu nome?\n")
GB = pow(2, 30)
try:
    print(perguntaNome + ", vamos para a parte de monitoramento!")
    print('='*10, 'INÍCIO DAS MEDIÇÕES', '='*10)
    print('-'*10, 'Ctrl+C para parar', '-'*10, '\n')
    while(True):
        print('Dados do processador do seu dispositivo:')
        percCpu = psutil.cpu_percent(interval = 10, percpu=False)
        percCpu2 = percCpu * 2.5
        percCpu3 = (percCpu2 * 7)/3
        if percCpu2 > 100:
            percCpu2 = 100
        if percCpu3 > 100:
            percCpu3 = 100

        exibicaoPercentualProcessador(1, percCpu)

        exibicaoPercentualProcessador(2, percCpu2)

        exibicaoPercentualProcessador(3, percCpu3)
        alertaCPU(percCpu, 1)
        alertaCPU(percCpu2, 2)
        alertaCPU(percCpu3, 3)

        print('Dados da memória do seu dispositivo:')
        memory = psutil.virtual_memory()
        pctUsedMemory = memory.percent
        exibicaoMemoria(1, pctUsedMemory)

        usedMemoryGB2 = (memory.used/GB)/2
        totalMemoryGB2 = (memory.total/GB)/2
        pctUsedMemory2 = (usedMemoryGB2/totalMemoryGB2)*3/2
        if pctUsedMemory2 > 100:
            pctUsedMemory2 = 100

        exibicaoMemoria(2, pctUsedMemory2)

        usedMemoryGB3 = (memory.used/GB)/3
        totalMemoryGB3 = (memory.total/GB)/3
        pctUsedMemory3 = (usedMemoryGB3 * totalMemoryGB3)*4

        if pctUsedMemory3 > 100:
            pctUsedMemory3 = 100

        exibicaoMemoria(3, pctUsedMemory3)
        alertaRAM(pctUsedMemory, 1)
        alertaRAM(pctUsedMemory2, 2)
        alertaRAM(pctUsedMemory3, 3)

        try:
            diskUsage = psutil.disk_usage(f'c:/')

        except:
            diskUsage = psutil.disk_usage('/')

        print('Dados do seu disco rígido:')
        pctUsedDisk = diskUsage.percent
        exibirDisco(1, pctUsedDisk)

        pctUsedDisk2 = pctUsedDisk * ((4-1)*4)/2
        if pctUsedDisk2 > 100:
            pctUsedDisk2 = 100
        exibirDisco(2, pctUsedDisk2)

        pctUsedDisk3 = pctUsedDisk * ((3-1)*6)/5
        if pctUsedDisk3 > 100:
            pctUsedDisk3 = 100
        exibirDisco(3, pctUsedDisk3)

        data_hora = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        insert_db(percCpu, pctUsedMemory, pctUsedDisk, 100, 1)
        insert_db(percCpu2, pctUsedMemory2, pctUsedDisk2, 101, 2)
        insert_db(percCpu3, pctUsedMemory3, pctUsedDisk3, 102, 3)
except KeyboardInterrupt:
    print("Até logo!")
    pass